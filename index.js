// First exercise 2.3
// const http = require('http'),
// 	url = require('url');

// http
// 	.createServer((request, response) => {
// 		let requestURL = url.parse(request.url, true);
// 		if (requestURL.pathname == '/documentation.html') {
// 			response.writeHead(200, { 'Content-Type': 'text/plain' });
// 			response.end('Documentation on the bookclub API.\n');
// 		} else {
// 			response.writeHead(200, { 'Content-Type': 'text/plain' });
// 			response.end('Welcome to my book club!\n');
// 		}
// 	})
// 	.listen(8080);

// console.log('My first Node test server is running on Port 8080.');

//Second exercise 2.3

// const express = require('express');
// const app = express();

// let topBooks = [
// 	{
// 		title: "Harry Potter and the Sorcerer's Stone",
// 		author: 'J.K. Rowling',
// 	},
// 	{
// 		title: 'Lord of the Rings',
// 		author: 'J.R.R. Tolkien',
// 	},
// 	{
// 		title: 'Twilight',
// 		author: 'Stephanie Meyer',
// 	},
// ];

// //GET requests
// app.get('/', (req, res) => {
// 	res.send('Welcome to my book club!');
// });

// app.get('/documentation', (req, res) => {
// 	res.sendFile('/documentation.html', { root: __dirname });
// });

// app.get('/books', (req, res) => {
// 	res.json(topBooks);
// });

// //listen for requests
// app.listen(8080, () => {
// 	console.log('Your app is listening on port 8080.');
// });

// THIRD CODE FROM EXERCISE 2.3

// const express = require('express');
// const app = express();

// let myLogger = (req, res, next) => {
// 	console.log(req.url);
// 	next();
// };

// let requestTime = (req, res, next) => {
// 	req.requestTime = Date.now();
// 	next();
// };

// app.use(myLogger);
// app.use(requestTime);

// app.get('/', (req, res) => {
// 	let responseText = 'welcome to my app!';
// 	responseText += '<small> Requested at: ' + req.requesTime + '<small>';
// 	res.send(responseText);
// });

// app.get('/secreturl', (req, res) => {
// 	let responseText = 'This is a secret url with super top-secret content.';
// 	responseText += '<small> Requested at: ' + req.requestTime + '<small>';
// 	res.send(responseText);
// });

// app.listen(8080, () => {
// 	console.log('Your app is listening on port 8080.');
// });

// FOURTH CODE FROM EXERCISE 2.3

// const express = require('express'),
// 	morgan = require('morgan');

// const app = express();

// app.use(morgan('common'));

// app.get('/', (req, res) => {
// 	res.send('Welcome to my app!');
// });

// app.get('/secreturl', (req, res) => {
// 	res.send('This is a secret url with super top-secret content.');
// });

// app.get('/documentation', (req, res) => {
// 	res.sendFile('public/documentation.html', { root: __dirname });
// });

// app.listen(8080, () => {
// 	console.log('Your app is listening on port 8080.');
// });

// EXERCISE 2.4

// const express = require('express'),
// 	morgan = require('morgan');

// const app = express();

// app.use(morgan('common'));
// app.use(express.static('public'));

// app.use((err, req, res, next) => {
// 	console.error(err.stack);
// 	res.status(500).send('Something broke!');
// });

// let topMovies = [
// 	{
// 		title: 'Black Panther',
// 		year: '2018',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'adventure',
// 			},
// 		],

// 		director: 'Ryan Coogler',
// 	},
// 	{
// 		title: 'Spider-man: into the spider-verse',
// 		year: '2018',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'animation',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'comedy',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 			{
// 				slot: 5,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 6,
// 				genre: 'kids and family',
// 			},
// 		],

// 		director: [
// 			{
// 				slot: 1,
// 				director: 'Bob Persichetti',
// 			},
// 			{
// 				slot: 2,
// 				director: 'Peter Ramsey',
// 			},
// 			{
// 				slot: 3,
// 				director: 'Rodney Rothman',
// 			},
// 		],
// 	},
// 	{
// 		title: 'The Incredibles',
// 		year: '2004',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'animation',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'comedy',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'kids and family',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 		],

// 		director: 'Brad Bird',
// 	},
// 	{
// 		title: 'Avengers: Endgame',
// 		year: '2019',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'sci fi',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 		],

// 		director: [
// 			{
// 				slot: 1,
// 				director: 'Anthony Russo',
// 			},
// 			{
// 				slot: 2,
// 				director: 'Joe Russo',
// 			},
// 		],
// 	},
// 	{
// 		title: 'The Dark Knight',
// 		year: '2008',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'adventure',
// 			},
// 		],

// 		director: 'Cristopher Nolan',
// 	},
// 	{
// 		title: 'Iron Man',
// 		year: '2008',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'sci fi',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 		],

// 		director: 'Jon Favreau',
// 	},
// 	{
// 		title: 'Superman: The Movie',
// 		year: '1978',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'sci fi',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 		],

// 		director: 'Richard Donner',
// 	},
// 	{
// 		title: 'Wonder Woman',
// 		year: '2017',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'adventure',
// 			},
// 		],

// 		director: 'Patty Jenkins',
// 	},
// 	{
// 		title: 'Thor: Ragnarok',
// 		year: '2017',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'sci fi',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'comedy',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 			{
// 				slot: 5,
// 				genre: 'action',
// 			},
// 		],

// 		director: 'Taika Waititi',
// 	},
// 	{
// 		title: 'Logan',
// 		year: '2017',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'adventure',
// 			},
// 		],

// 		director: 'James Mangold',
// 	},
// ];

// //GET requests
// app.get('/', (req, res) => {
// 	res.send('Welcome to myFlix!');
// });

// app.get('/movies', (req, res) => {
// 	res.json(topMovies);
// });

// app.listen(8080, () => {
// 	console.log('Your app is listening on port 8080.');
// });

// // EXERCISE 2.5

// const express = require('express'),
// 	bodyParser = require('body-parser'),
// 	uuid = require('uuid'),
// 	morgan = require('morgan');

// const app = express();

// app.use(morgan('common'));
// app.use(bodyParser.json());
// app.use(express.static('public'));

// let topMovies = [
// 	{
// 		id: '1',
// 		title: 'Black Panther',
// 		year: '2018',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'adventure',
// 			},
// 		],

// 		directors: 'Ryan Coogler',
// 	},
// 	{
// 		id: '2',
// 		title: 'Spider-man: into the spider-verse',
// 		year: '2018',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'animation',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'comedy',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 			{
// 				slot: 5,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 6,
// 				genre: 'kids and family',
// 			},
// 		],

// 		directors: [
// 			{
// 				slot: 1,
// 				director: 'Bob Persichetti',
// 			},
// 			{
// 				slot: 2,
// 				director: 'Peter Ramsey',
// 			},
// 			{
// 				slot: 3,
// 				director: 'Rodney Rothman',
// 			},
// 		],
// 	},
// 	{
// 		id: '3',
// 		title: 'The Incredibles',
// 		year: '2004',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'animation',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'comedy',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'kids and family',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 		],

// 		directors: 'Brad Bird',
// 	},
// 	{
// 		id: '4',
// 		title: 'Avengers: Endgame',
// 		year: '2019',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'sci fi',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 		],

// 		directors: [
// 			{
// 				slot: 1,
// 				director: 'Anthony Russo',
// 			},
// 			{
// 				slot: 2,
// 				director: 'Joe Russo',
// 			},
// 		],
// 	},
// 	{
// 		id: '5',
// 		title: 'The Dark Knight',
// 		year: '2008',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'adventure',
// 			},
// 		],

// 		directors: 'Cristopher Nolan',
// 	},
// 	{
// 		id: '6',
// 		title: 'Iron Man',
// 		year: '2008',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'sci fi',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 		],

// 		directors: 'Jon Favreau',
// 	},
// 	{
// 		id: '7',
// 		title: 'Superman: The Movie',
// 		year: '1978',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'sci fi',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 		],

// 		directors: 'Richard Donner',
// 	},
// 	{
// 		id: '8',
// 		title: 'Wonder Woman',
// 		year: '2017',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'adventure',
// 			},
// 		],

// 		directors: 'Patty Jenkins',
// 	},
// 	{
// 		id: '9',
// 		title: 'Thor: Ragnarok',
// 		year: '2017',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'sci fi',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'comedy',
// 			},
// 			{
// 				slot: 4,
// 				genre: 'adventure',
// 			},
// 			{
// 				slot: 5,
// 				genre: 'action',
// 			},
// 		],

// 		directors: 'Taika Waititi',
// 	},
// 	{
// 		id: '10',
// 		title: 'Logan',
// 		year: '2017',
// 		genre: [
// 			{
// 				slot: 1,
// 				genre: 'fantasy',
// 			},
// 			{
// 				slot: 2,
// 				genre: 'action',
// 			},
// 			{
// 				slot: 3,
// 				genre: 'adventure',
// 			},
// 		],

// 		directors: 'James Mangold',
// 	},
// ];

// //Welcoming message
// app.get('/', (req, res) => {
// 	res.send('Welcome to myFlix!');
// });

// //GET the list of ALL movies

// app.get('/movies', (req, res) => {
// 	res.json(topMovies);
// 	res.send('Succesful GET request returning data from all movies.');
// });

// //GET the data about a single movie, by title

// app.get('/movies/:title', (req, res) => {
// 	res.json(
// 		topMovies.find((movie) => {
// 			return movie.title === req.params.title;
// 		})
// 	);
// 	res.send('Succesful GET request returning data from movie by title.');
// });

// //Add a movie to list of movies

// app.post('/movies', (req, res) => {
// 	let newMovie = req.body;

// 	if (!newMovie.title) {
// 		const message = 'Missing title in request body';
// 		res.status(400).send(message);
// 	} else {
// 		newMovie.id = uuid.v4();
// 		topMovies.push(newMovie);
// 		res.status(201).send(newMovie);
// 	}
// });

// // Delete a movie by ID

// app.delete('/movies/:id', (req, res) => {
// 	let movie = topMovies.find((movie) => {
// 		return movie.id === req.params.id;
// 	});

// 	if (movie) {
// 		topMovies = topMovies.filter((obj) => {
// 			return obj.id !== req.params.id;
// 		});
// 		res.status(201).send('Movie ' + req.params.id + ' was deleted.');
// 	}
// });

// // Update a movie title in a certain year

// app.put('/movies/:title/:year', (req, res) => {
// 	let movie = topMovies.find((movie) => {
// 		return movie.title === req.params.title;
// 	});

// 	if (movie) {
// 		movie.year[req.params.year] = parseInt(req.params.title);
// 		res
// 			.status(201)
// 			.send(
// 				'Movie ' +
// 					req.params.title +
// 					' was released in ' +
// 					req.params.year +
// 					' . '
// 			);
// 	} else {
// 		res
// 			.status(404)
// 			.send('Movie with the title ' + req.params.title + ' was not found.');
// 	}
// });

// // GET the directors of a movie
// app.get('movies/:title/directors', (req, res) => {
// 	let movie = topMovies.find((movie) => {
// 		return movie.title === req.params.title;
// 	});

// 	if (movie) {
// 		let movieTitles = Object.values(movie.title);
// 		let movieDirectors = movie.directors;

// 		console.log(movie);
// 		console.log(movieTitles);
// 		console.log(movieDirectors);
// 		res.status(201).send('' + directors);
// 		// res.status(201).send(year);
// 	} else {
// 		res
// 			.status(404)
// 			.send('Movie with the title ' + req.params.title + ' was not found.');
// 	}
// });

// app.listen(8080, () => {
// 	console.log('Your app is listening on port 8080.');
// });

// EXERCISE 2.8

const express = require('express'),
	bodyParser = require('body-parser'),
	uuid = require('uuid'),
	morgan = require('morgan');
const { isInteger } = require('lodash');

const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

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

//Default text response when at/

app.get('/', (req, res) => {
	res.send('Welcome to myFlix!');
});

//GET list of ALL movies

app.get('/movies', (req, res) => {
	Movies.find()
		.then((movies) => {
			res.status(201).json(movies);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

// GET list of ALL users
app.get('/users', (req, res) => {
	Users.find()
		.then((users) => {
			res.status(201).json(users);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

//GET a user by username

app.get('/users/:Username', (req, res) => {
	Users.findOne({ Username: req.params.Username })
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

//GET data about a single movie, by title

app.get('/movies/:Title', (req, res) => {
	Movies.findOne({ Title: req.params.Title })
		.then((movie) => {
			res.json(movie);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

//GET data about movies by genre
app.get('/movies/genres/:Name', (req, res) => {
	Genres.findOne({ Name: req.params.Name })
		.then((genre) => {
			res.json(genre.Description);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

//GET data about a director by name

app.get('/movies/directors/:Name', (req, res) => {
	Directors.findOne({ Name: req.params.Name })
		.then((director) => {
			res.json(director.Bio);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

// //Add a movie to list of movies

// app.post('/movies', (req, res) => {
// 	let newMovie = req.body;

// 	if (!newMovie.tTtle) {
// 		const message = 'Missing title in request body';
// 		res.status(400).send(message);
// 	} else {
// 		newMovie.id = uuid.v4();
// 		topMovies.push(newMovie);
// 		res.status(201).send(newMovie);
// 	}
// });

app.post('/movies', (req, res) => {
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
});

//Allow new users to register
//ADD user to list of users
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
		.then((user) => {
			if (user) {
				return res.status(400).send(req.body.Username + ' already exists');
			} else {
				Users.create({
					Username: req.body.Username,
					Password: req.body.Password,
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

app.post('/users/:Username/Movies/:MovieID', (req, res) => {
	Users.findOneAndUpdate(
		{ Username: req.params.Username },
		{
			$push: { Fav: req.params.MovieID },
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

app.post('/users/:Username/Movies/:MovieID', (req, res) => {
	Users.findOneAndUpdate(
		{ Username: req.params.Username },
		{
			$pull: { Fav: req.params.MovieID },
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
