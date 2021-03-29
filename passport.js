const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	Models = require('./models.js'),
	passportJWT = require('passport-jwt');

let User = Models.User,
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
			User.findOne({ Username: Username }, (error, User) => {
				if (error) {
					console.log(error);
					return callback(error);
				}

				if (!User) {
					console.log('incorrect username');
					return callback(null, false, {
						message: 'Incorrect username.',
					});
				}

				if (!User.validatePassword(Password)) {
					console.log('incorrect password');
					return callback(null, false, { message: 'Incorrect password.' });
				}

				console.log('finished');
				return callback(null, User);
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
			return User.findById(jwtPayload._id)
				.then((User) => {
					return callback(null, User);
				})
				.catch((error) => {
					return callback(error);
				});
		}
	)
);
