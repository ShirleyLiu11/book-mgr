const mongoose = require('mongoose');
const { connect }  = require('../src/db/index');
const character = require('../src/helpers/character');

const { defaultCharacters } = character;

const Character =  mongoose.model('Character');

connect().then(() => {
    console.log('Start initializing the character set');
    Character.insertMany(defaultCharacters);
    console.log('Character set initialization complete');

});