var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const authorSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    nationality: {type: String, required: true}
})

module.exports = mongoose.model("Author", authorSchema);