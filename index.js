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

const express = require('express'),
	morgan = require('morgan');

const app = express();

app.use(morgan('common'));
app.use(express.static('public'));

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

let topMovies = [
	{
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

		director: 'Ryan Coogler',
	},
	{
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

		director: [
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

		director: 'Brad Bird',
	},
	{
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

		director: [
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

		director: 'Cristopher Nolan',
	},
	{
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

		director: 'Jon Favreau',
	},
	{
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

		director: 'Richard Donner',
	},
	{
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

		director: 'Patty Jenkins',
	},
	{
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

		director: 'Taika Waititi',
	},
	{
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

		director: 'James Mangold',
	},
];

//GET requests
app.get('/', (req, res) => {
	res.send('Welcome to myFlix!');
});

app.get('/movies', (req, res) => {
	res.json(topMovies);
});

app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
});
