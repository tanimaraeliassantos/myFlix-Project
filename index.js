const express = require('express'),
	bodyParser = require('body-parser'),
	uuid = require('uuid'),
	morgan = require('morgan');
const { isInteger } = require('lodash');

const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

const { check, validationResult } = require('express-validator');

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				let message =
					"The CORS policy for this application doesn't allow access from origin" +
					origin;
				return callback(new Error(message), false);
			}
			return callback(null, true);
		},
	})
);

const Movies = Models.Movies;
const user = Models.user;

// mongoose.connect('mongodb://localhost:27017/myFlixDB'
mongoose.connect(process.env.CONNECTION_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

//Default text response when at home/

app.get('/', (req, res) => {
	res.send('Welcome to myFlix!');
});

//GET list of ALL movies

app.get(
	'/movies',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Movies.find()
			.then((Movies) => {
				res.status(201).json(Movies);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
	}
);

// GET list of ALL users

app.get(
	'/users',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		user
			.find()
			.then((user) => {
				res.status(201).json(user);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
	}
);

//GET a user by username

app.get(
	'/users/:username',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		user
			.findOne({ username: req.params.username })
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
	}
);

//GET data about a single movie, by title

app.get(
	'/movies/:Title',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Movies.findOne({ Title: req.params.Title })
			.then((Movies) => {
				res.json(Movies);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
	}
);

//GET data about movies by genre

app.get(
	'/movies/genres/:Name',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Movies.find({ 'Genre.Name': req.params.Name })
			.then((Genres) => {
				res.json(Genres);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
	}
);

//GET data about a director by name

app.get(
	'/movies/directors/:Name',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Movies.find({ 'Director.Name': req.params.Name })
			.then((Directors) => {
				res.json(Directors);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
	}
);

// ADD movie to list of movies

app.post(
	'/movies',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Movies.findOne({ Username: req.body.Title })
			.then((movie) => {
				if (movie) {
					return res.status(400).send(req.body.Title + ' already exists');
				} else {
					Movies.create({
						Title: req.body.Title,
						Description: req.body.Description,
						ImagePath: req.body.ImagePath,
						Featured: req.body.Featured,
					})
						.then((movie) => {
							res.status(201).json(movie);
						})
						.catch((error) => {
							console.error(error);
							res.status(500).send('Error: ' + error);
						});
				}
			})
			.catch((error) => {
				console.error(error);
				res.status(500).send('Error: ' + error);
			});
	}
);

//Allow new users to register

app.post(
	'/users',
	[
		check('username', 'username is required').isLength({ min: 5 }),
		check(
			'username',
			'username contains non alphanumeric characters - not allowed.'
		).isAlphanumeric(),
		check('Password', 'Password is required').not().isEmpty(),
		check('Email', 'Email does not appear to be valid.').isEmail(),
	],
	(req, res) => {
		let errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		let hashedPassword = user.hashPassword(req.body.Password);
		user
			.findOne({ Username: req.body.username })
			.then((user) => {
				if (user) {
					return res.status(400).send(req.body.username + ' already exists');
				} else {
					user
						.create({
							username: req.body.username,
							Password: hashedPassword,
							Email: req.body.Email,
							Birthday: req.body.Birthday,
						})
						.then((user) => {
							res.status(201).json(user);
						})
						.catch((error) => {
							console.error(error);
							res.status(500).send('Error: ' + error);
						});
				}
			})
			.catch((error) => {
				console.error(error);
				res.status(500).send('Error: ' + error);
			});
	}
);

// Update a user's info, by username

app.put(
	'/users/:username',
	[
		check('username', 'username is required').isLength({ min: 5 }),
		check(
			'username',
			'username contains non alphanumeric characters - not allowed.'
		).isAlphanumeric(),
		check('Password', 'Password is required').not().isEmpty(),
		check('Email', 'Email does not appear to be valid.').isEmail(),
	],
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		let errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		user.findOneAndUpdate(
			{ username: req.params.username },
			{
				$set: {
					username: req.body.username,
					Password: req.body.Password,
					Email: req.body.Email,
					Birthday: req.body.Birthday,
				},
			},
			{ new: true },
			(err, updatedUser) => {
				if (err) {
					console.error(err);
					res.status(500).send('Error: ' + err);
				} else {
					res.json(updatedUser);
				}
			}
		);
	}
);

//ADD a movie to list of favorites

app.get(
	'/users/:username/movies/:MovieID',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		user.findOneAndUpdate(
			{ username: req.params.Username },
			{
				$push: { FavoriteMovies: req.params.MovieID },
			},
			{ new: true },
			(err, updatedUser) => {
				if (err) {
					console.error(err);
					res.status(500).send('Error: ' + err);
				} else {
					res.json(updatedUser);
				}
			}
		);
	}
);

// REMOVE a movie from favorites

app.delete(
	'/users/:username/movies/:MovieID',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		user.findOneAndUpdate(
			{ username: req.params.username },
			{ $pull: { FavoriteMovies: req.params.MovieID } },
			{ new: true },
			(err, updatedUser) => {
				if (err) {
					console.error(err);
					res.status(500).send('Error: ' + err);
				} else {
					res.json(updatedUser);
				}
			}
		);
	}
);

//Allow existing user to deregister

app.delete(
	'/users/:username',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		user
			.findOneAndRemove({ username: req.params.username })
			.then((user) => {
				if (!user) {
					res.status(400).send(req.params.username + ' was not found');
				} else {
					res.status(200).send(req.params.username + ' was deleted.');
				}
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
	}
);

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
	console.log('Listening on Port' + port);
});
