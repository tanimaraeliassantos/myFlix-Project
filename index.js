const express = require('express'),
	bodyParser = require('body-parser'),
	uuid = require('uuid'),
	morgan = require('morgan');
const { isInteger } = require('lodash');

const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movies;
const Users = Models.Users;
const Genres = Models.Genres;
const Directors = Models.Directors;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
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
		Users.find()
			.then((Users) => {
				res.status(201).json(Users);
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
		Users.findOne({ Username: req.params.Username })
			.then((Users) => {
				res.json(Users);
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

app.post('/users', (req, res) => {
	Users.findOne({ Username: req.body.Username })
		.then((User) => {
			if (User) {
				return res.status(400).send(req.body.Username + ' already exists');
			} else {
				Users.create({
					Username: req.body.Username,
					Password: req.body.Password,
					Email: req.body.Email,
					Birthday: req.body.Birthday,
				})
					.then((User) => {
						res.status(201).json(Users);
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
});

// Update a user's info, by username

app.put(
	'/users/:Username',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Users.findOneAndUpdate(
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

//ADD a movie to a user's list of favorites

app.get(
	'/users/:Username/movies/:MovieID',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Users.findOneAndUpdate(
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

// DELETE a movie from favorites

app.delete(
	'/users/:Username/movies/:MovieID',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Users.findOneAndUpdate(
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
		Users.findOneAndRemove({ Username: req.params.Username })
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

app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
});
