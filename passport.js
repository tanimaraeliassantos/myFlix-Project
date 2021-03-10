const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	Models = require('./models.js'),
	passportJWT = require('passport-jwt');

let Users = Models.Users,
	JWTStrategy = passportJWT.Strategy,
	ExtractJWT = passportJWT.ExtractJwt;

passport.use(
	new LocalStrategy(
		{
			usernameField: 'Username',
			passwordField: 'Password',
		},
		(username, password, callback) => {
			console.log(username + '  ' + password);
			Users.findOne({ Username: username }, (error, Users) => {
				if (error) {
					console.log(error);
					return callback(error);
				}

				if (!Users) {
					console.log('incorrect username');
					return callback(null, false, {
						message: 'Incorrect username.',
					});
				}

				if (!username.validatePassword(password)) {
					console.log('incorrect password');
					return callback(null, false, { message: 'Incorrect password.' });
				}

				console.log('finished');
				return callback(null, Users);
			});
		}
	)
);

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'your_jwt_secret',
		},
		(jwtPayload, callback) => {
			return Users.findById(jwtPayload._id)
				.then((Users) => {
					return callback(null, Users);
				})
				.catch((error) => {
					return callback(error);
				});
		}
	)
);
