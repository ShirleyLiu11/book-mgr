const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const BookSchema = new mongoose.Schema({
    //book title
    name: String,
    //price
    price: Number,
    //author
    author: String,
    //publish date
    publishDate: String,
    //Classify
    classify: String,
    //in stock
    count: Number,

    meta: getMeta(),
});

BookSchema.pre('save', preSave);


mongoose.model('Book', BookSchema);

