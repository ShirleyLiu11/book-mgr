const mongoose = require('mongoose');
const { getMate } = require('../helpers');

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

    meta: getMate(),
});


mongoose.model('Book', BookSchema);

