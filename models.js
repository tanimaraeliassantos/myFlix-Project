//require Mongoose package
const mongoose = require('mongoose');
//require bcrypt
const bcrypt = require('bcrypt');

let MovieSchema = mongoose.Schema({
	Title: { type: String, required: true },
	Description: { type: String, required: true },
	Genre: {
		Name: String,
		Description: String,
	},
	Director: {
		Name: String,
		Bio: String,
	},
	Actors: [String],
	ImagePath: String,
	Featured: Boolean,
});

let userSchema = mongoose.Schema({
	Username: { type: String, required: true },
	Password: { type: String, required: true },
	Email: { type: String, required: true },
	Birthday: Date,
	FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }],
});

/**
 * Function to hash a password so that only encrypted password is stored in the database
 * @param {string} password
 */
userSchema.statics.hashPassword = function (password) {
	return bcrypt.hashSync(password, 10);
};

/**
 * Function to compare the hashed password in the database with the password that users enter
 *  @param {string} password
 */

userSchema.methods.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.Password);
};

let Movies = mongoose.model('Movies', MovieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movies = Movies;
module.exports.User = User;
