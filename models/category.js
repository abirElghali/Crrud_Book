const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
    title: {type: String, required: true ,enum: ['Horror','Mystery']},
    books: [{ type: Schema.Types.ObjectId, ref: 'Book'}]
})

module.exports = mongoose.model("Category", categorySchema)