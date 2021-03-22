const mongoose = require('mongoose');
const { stringify } = require('uuid');
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

userSchema.statics.hashPassword = (Password) => {
	return bcrypt.hashSync(Password, 10);
};

userSchema.methods.validatePassword = function (Password) {
	return bcrypt.compareSync(Password, this.Password);
};

let Movies = mongoose.model('Movies', MovieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movies = Movies;
module.exports.User = User;
