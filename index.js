// EXERCISE 2.8

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

let topMovies = [
	{
		id: '1',
		title: 'Black Panther',
		year: '2018',
		genre: [
			{
				slot: 1,
				genre: 'fantasy',
			},
			{
				slot: 2,
				genre: 'action',
			},
			{
				slot: 3,
				genre: 'adventure',
			},
		],

		directors: 'Ryan Coogler',
	},
	{
		id: '2',
		title: 'Spider-man: into the spider-verse',
		year: '2018',
		genre: [
			{
				slot: 1,
				genre: 'animation',
			},
			{
				slot: 2,
				genre: 'fantasy',
			},
			{
				slot: 3,
				genre: 'comedy',
			},
			{
				slot: 4,
				genre: 'adventure',
			},
			{
				slot: 5,
				genre: 'action',
			},
			{
				slot: 6,
				genre: 'kids and family',
			},
		],

		directors: [
			{
				slot: 1,
				director: 'Bob Persichetti',
			},
			{
				slot: 2,
				director: 'Peter Ramsey',
			},
			{
				slot: 3,
				director: 'Rodney Rothman',
			},
		],
	},
	{
		id: '3',
		title: 'The Incredibles',
		year: '2004',
		genre: [
			{
				slot: 1,
				genre: 'animation',
			},
			{
				slot: 2,
				genre: 'comedy',
			},
			{
				slot: 3,
				genre: 'kids and family',
			},
			{
				slot: 4,
				genre: 'adventure',
			},
		],

		directors: 'Brad Bird',
	},
	{
		id: '4',
		title: 'Avengers: Endgame',
		year: '2019',
		genre: [
			{
				slot: 1,
				genre: 'sci fi',
			},
			{
				slot: 2,
				genre: 'fantasy',
			},
			{
				slot: 3,
				genre: 'action',
			},
			{
				slot: 4,
				genre: 'adventure',
			},
		],

		directors: [
			{
				slot: 1,
				director: 'Anthony Russo',
			},
			{
				slot: 2,
				director: 'Joe Russo',
			},
		],
	},
	{
		id: '5',
		title: 'The Dark Knight',
		year: '2008',
		genre: [
			{
				slot: 1,
				genre: 'fantasy',
			},
			{
				slot: 2,
				genre: 'action',
			},
			{
				slot: 3,
				genre: 'adventure',
			},
		],

		directors: 'Cristopher Nolan',
	},
	{
		id: '6',
		title: 'Iron Man',
		year: '2008',
		genre: [
			{
				slot: 1,
				genre: 'sci fi',
			},
			{
				slot: 2,
				genre: 'fantasy',
			},
			{
				slot: 3,
				genre: 'action',
			},
			{
				slot: 4,
				genre: 'adventure',
			},
		],

		directors: 'Jon Favreau',
	},
	{
		id: '7',
		title: 'Superman: The Movie',
		year: '1978',
		genre: [
			{
				slot: 1,
				genre: 'sci fi',
			},
			{
				slot: 2,
				genre: 'fantasy',
			},
			{
				slot: 3,
				genre: 'action',
			},
			{
				slot: 4,
				genre: 'adventure',
			},
		],

		directors: 'Richard Donner',
	},
	{
		id: '8',
		title: 'Wonder Woman',
		year: '2017',
		genre: [
			{
				slot: 1,
				genre: 'fantasy',
			},
			{
				slot: 2,
				genre: 'action',
			},
			{
				slot: 3,
				genre: 'adventure',
			},
		],

		directors: 'Patty Jenkins',
	},
	{
		id: '9',
		title: 'Thor: Ragnarok',
		year: '2017',
		genre: [
			{
				slot: 1,
				genre: 'fantasy',
			},
			{
				slot: 2,
				genre: 'sci fi',
			},
			{
				slot: 3,
				genre: 'comedy',
			},
			{
				slot: 4,
				genre: 'adventure',
			},
			{
				slot: 5,
				genre: 'action',
			},
		],

		directors: 'Taika Waititi',
	},
	{
		id: '10',
		title: 'Logan',
		year: '2017',
		genre: [
			{
				slot: 1,
				genre: 'fantasy',
			},
			{
				slot: 2,
				genre: 'action',
			},
			{
				slot: 3,
				genre: 'adventure',
			},
		],

		directors: 'James Mangold',
	},
];

//Default text response when at home/

app.get('/', (req, res) => {
	res.send('Welcome to myFlix!');
});

//GET list of ALL movies

app.get('/movies', (req, res) => {
	Movies.find()
		.then((Movies) => {
			res.status(201).json(Movies);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

// GET list of ALL users

app.get('/users', (req, res) => {
	Users.find()
		.then((Users) => {
			res.status(201).json(Users);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

//GET a user by username

app.get('/users/:Username', (req, res) => {
	Users.findOne({ Username: req.params.Username })
		.then((Users) => {
			res.json(Users);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

//GET data about a single movie, by title

app.get('/movies/:Title', (req, res) => {
	Movies.findOne({ Title: req.params.Title })
		.then((Movies) => {
			res.json(Movies);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

//GET data about movies by genre

app.get('/movies/genres/:Name', (req, res) => {
	Movies.find({ 'Genre.Name': req.params.Name })
		.then((Genres) => {
			res.json(Genres);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

//GET data about a director by name

app.get('/movies/directors/:Name', (req, res) => {
	Movies.find({ 'Director.Name': req.params.Name })
		.then((Directors) => {
			res.json(Directors);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

// ADD movie to list of movies

app.post('/movies', (req, res) => {
	Movies.findOne({ Username: req.body.Title })
		.then((Movies) => {
			if (Movies) {
				return res.status(400).send(req.body.Title + ' already exists');
			} else {
				Movies.create({
					Title: req.body.Title,
					Description: req.body.Description,
					ImagePath: req.body.ImagePath,
					Featured: req.body.Featured,
				})
					.then((Movies) => {
						res.status(201).json(Movies);
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

//Allow new users to register

/* JSON will be expected in this format
{
	ID: Integer,
	Username: String,
	Password: String,
	Email: String,
	Birthday: Date
}*/

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

/* JSON is expected in this format
{
	Username: String,
	(required)
	Password: String,
	(required)
	Email: String,
	(required)
	Birthday: Date
} */

app.put('/users/:Username', (req, res) => {
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
});

//ADD a movie to a user's list of favorites

app.post('/users/:username/movies/:MovieID', (req, res) => {
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
});

// DELETE a movie from favorites

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
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
});

// // DELETE Favoritemovies key (NOT WORKING, it deletes a whole user instead)

// app.delete('/users/:Username', (req, res) => {
// 	Users.findOneAndRemove(req.params.FavoriteMovies, function (err) {
// 		if (err) res.send(err);
// 		else res.json({ message: 'Favorite Movies deleted' });
// 	});
// });

//Allow existing user to deregister
//DELETE a user by username

app.delete('/users/:Username', (req, res) => {
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
});

app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
});

// [
//     {
//         "FavoriteMovies": [],
//         "_id": "6035c387245c850d46cfa47d",
//         "Username": "GiaMia",
//         "Password": "Password123",
//         "Email": "giamatthews@gmail.com",
//         "Birthday": "1980-09-30T14:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "FavoriteMovies": [],
//         "_id": "6035c412245c850d46cfa47f",
//         "Username": "MonAmi",
//         "Password": "Password456",
//         "Email": "tierneybarr@gmail.com",
//         "Birthday": "1988-05-23T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "FavoriteMovies": [],
//         "_id": "6035c44c245c850d46cfa480",
//         "Username": "Nofun",
//         "Password": "Password789",
//         "Email": "emersonpruitt@gmail.com",
//         "Birthday": "1998-08-08T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "FavoriteMovies": [],
//         "_id": "6035c478245c850d46cfa481",
//         "Username": "OBG",
//         "Password": "Password147",
//         "Email": "marliealexander@gmail.com",
//         "Birthday": "1964-12-03T00:00:00.000Z",
//         "__v": 0
//     },
//     {
//         "FavoriteMovies": [],
//         "_id": "6035c493245c850d46cfa482",
//         "Username": "testUser123",
//         "Password": "testpassword456",
//         "Email": "testemail@gmail.com",
//         "Birthday": "1981-10-09T14:00:00.000Z",
//         "__v": 0
//     }
// ]
