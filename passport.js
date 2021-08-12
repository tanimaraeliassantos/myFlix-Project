const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	Models = require('./models.js'),
	passportJWT = require('passport-jwt');

let User = Models.User,
	JWTStrategy = passportJWT.Strategy,
	ExtractJWT = passportJWT.ExtractJwt;

/** Passport strategy that defines HTTP authentication for login request */

passport.use(
	new LocalStrategy(
		{
			usernameField: 'Username',
			passwordField: 'Password',
		},
		(username, password, callback) => {
			console.log(username + '  ' + password);
			User.findOne({ Username: username }, (error, user) => {
				if (error) {
					console.log(error);
					return callback(error);
				}

				if (!user) {
					console.log('incorrect username');
					return callback(null, false, {
						message: 'Incorrect username.',
					});
				}

				if (!user.validatePassword(password)) {
					console.log('incorrect password');
					return callback(null, false, { message: 'Incorrect password.' });
				}

				console.log('finished');
				return callback(null, user);
			});
		}
	)
);

/** Passport strategy setts up JWT authentication
 *  for all endpoints requiring bearer token with request body */

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'your_jwt_secret', //verifies JWT signature
		},
		(jwtPayload, callback) => {
			return User.findById(jwtPayload._id)
				.then((user) => {
					return callback(null, user);
				})
				.catch((error) => {
					return callback(error);
				});
		}
	)
);
