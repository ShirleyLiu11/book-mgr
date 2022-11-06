const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const CharacterSchema = new mongoose.Schema({
    name: String, //member or admin
    title: String, //member   administrator
    power: Object,

    meta: getMeta(),
});

CharacterSchema.pre('save', preSave);

mongoose.model('Character', CharacterSchema);  

