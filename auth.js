const jwtSecret = 'your_jwt_secret';
const jwt = require('jsonwebtoken'),
	passport = require('passport');

require('./passport');

let generateJWTToken = (Users) => {
	return jwt.sign(Users, jwtSecret, {
		subject: Users.Username,
		expiresIn: '7d',
		algorithm: 'HS256',
	});
};
/* POST login. */
module.exports = (router) => {
	router.post('/login', (req, res) => {
		passport.authenticate('local', { session: false }, (error, Users, info) => {
			if (error || !Users) {
				return res.status(400).json({
					message: 'Something is not right',
					Users: Users,
				});
			}
			req.login(Users, { session: false }, (error) => {
				if (error) {
					res.send(error);
				}
				let token = generateJWTToken(Users.toJSON());
				return res.json({ Users, token });
			});
		})(req, res);
	});
};
