var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		index: true
	}
}, {
	timestamps: true,
	strict: true
});

module.exports = mongoose.model('Category', Category);
