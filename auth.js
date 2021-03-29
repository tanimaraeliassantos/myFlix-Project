const jwtSecret = 'your_jwt_secret';
const jwt = require('jsonwebtoken'),
	passport = require('passport');

require('./passport');

let generateJWTToken = (User) => {
	return jwt.sign(User, jwtSecret, {
		subject: User.Username,
		expiresIn: '7d',
		algorithm: 'HS256',
	});
};

/* POST login. */
module.exports = (router) => {
	router.post('/login', (req, res) => {
		passport.authenticate('local', { session: false }, (error, User, info) => {
			if (error || !User) {
				return res.status(400).json({
					message: 'Error:' + error,
					User: User,
				});
			}
			req.login(User, { session: false }, (error) => {
				if (error) {
					res.send(error);
				}
				let token = generateJWTToken(User.toJSON());
				return res.json({ User, token });
			});
		})(req, res);
	});
};
