const express = require('express'),
	bodyParser = require('body-parser'),
	uuid = require('uuid'),
	morgan = require('morgan');
const { isInteger } = require('lodash');
require('dotenv').config();
const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const cors = require('cors');
let allowedOrigins = [
	'http://localhost:8080',
	'http://testsite.com',
	'http://localhost:1234',
	'https://moviesmyflix.netlify.app',
	'https://unruffled-ramanujan-e4eaa5.netlify.app',
	'http://localhost:4200',
	'https://anthropovixen.github.io',
	'*',
];

const { check, validationResult } = require('express-validator');
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

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
const User = Models.User;

// mongodb atlas
mongoose.connect(process.env.CONNECTION_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(express.static('public'));

let auth = require('./auth.js')(app);

const passport = require('passport');
require('./passport.js');

//Default text response when at home

app.get('/', (req, res) => {
	res.send('Welcome to myFlix!');
});

// Get documentation
app.get('/documentation', (req, res) => {
	res.sendFile('public/documentation.html', { root: __dirname });
});

//GET list of ALL movies

app.get(
	'/movies',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Movies.find()
			.then((movies) => {
				res.status(201).json(movies);
			})
			.catch((error) => {
				console.error(error);
				res.status(500).send('Error: ' + error);
			});
	}
);

// GET list of ALL users

app.get(
	'/users',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		User.find()
			.then((responseuser) => {
				res.status(201).json(responseuser);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send('Error: ' + err);
			});
	}
);

//GET a user by username

app.get(
	'/users/:Username',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		User.findOne({ Username: req.params.Username })
			.then((responseuser) => {
				res.json(responseuser);
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
	// passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Movies.findOne({ Title: req.params.Title })
			.then((movies) => {
				res.json(movies);
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
	// passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Movies.find({ 'Genre.Name': req.params.Name })
			.then((genre) => {
				res.json(genre);
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
	// passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Movies.find({ 'Director.Name': req.params.Name })
			.then((directors) => {
				res.json(directors);
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
	// passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Movies.findOne({ Username: req.body.Title })
			.then((movies) => {
				if (movies) {
					return res.status(400).send(req.body.Title + ' already exists');
				} else {
					Movies.create({
						Title: req.body.Title,
						Description: req.body.Description,
						ImagePath: req.body.ImagePath,
						Featured: req.body.Featured,
					})
						.then((movies) => {
							res.status(201).json(movies);
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
		check('Username', 'Username is required').isLength({ min: 5 }),
		check(
			'Username',
			'Username contains non alphanumeric characters - not allowed.'
		).isAlphanumeric(),
		check('Password', 'Password is required').not().isEmpty(),
		check('Email', 'Email does not appear to be valid.').isEmail(),
	],
	(req, res) => {
		let errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		let hashedPassword = User.hashPassword(req.body.Password);
		User.findOne({ Username: req.body.Username })
			.then((user) => {
				if (user) {
					return res.status(400).send(req.body.Username + ' already exists');
				} else {
					User.create({
						Username: req.body.Username,
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
	'/users/:Username',
	[
		check('Username', 'Username is required').isLength({ min: 5 }),
		check(
			'Username',
			'Username contains non alphanumeric characters - not allowed.'
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
		User.findOneAndUpdate(
			{ Username: req.params.Username },
			{
				$set: {
					Username: req.body.Username,
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
	'/users/:Username/movies/:MovieID',
	// passport.authenticate('jwt', { session: false }),
	(req, res) => {
		User.findOneAndUpdate(
			{ Username: req.params.Username },
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
	'/users/:Username/movies/:MovieID',
	// passport.authenticate('jwt', { session: false }),
	(req, res) => {
		User.findOneAndUpdate(
			{ Username: req.params.Username },
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
	'/users/:Username',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		User.findOneAndRemove({ Username: req.params.Username })
			.then((user) => {
				if (!user) {
					res.status(400).send(req.params.Username + ' was not found');
				} else {
					res.status(200).send(req.params.Username + ' was deleted.');
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
