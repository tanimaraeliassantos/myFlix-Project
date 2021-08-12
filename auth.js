// If username and password in the body of the request exist in the database
const jwtSecret = 'your_jwt_secret'; //This needs to be the same key used in the JWTStrategy in passport.js
const jwt = require('jsonwebtoken'),
	passport = require('passport');

require('./passport'); //Local passport file

/** Function to generate authentication token with expiration and algorithm settings
 * @param {string} User
 * @returns JWTToken
 */
let generateJWTToken = (User) => {
	return jwt.sign(User, jwtSecret, {
		subject: User.Username, //Username encoded in the JWT
		expiresIn: '7d', // Token will expire in 7 days
		algorithm: 'HS256', //Algorithm used to encode the values of JWT
	});
};

/** POST login. */
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
