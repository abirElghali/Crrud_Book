const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const idValidator = require('mongoose-id-validator');

const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    publication_date: {type: String, required: true},
    price: {type: String, required: true},
    author: { type: Schema.Types.ObjectId, ref: 'Author'},
    category: [{ type: Schema.Types.ObjectId, ref: 'Category'}]
});

bookSchema.plugin(idValidator);

bookSchema.statics.findByAuthor = async function (authorId) {
    return this.find({ author: authorId });
  };

module.exports = mongoose.model("Book", bookSchema)