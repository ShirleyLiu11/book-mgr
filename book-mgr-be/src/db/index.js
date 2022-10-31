require('./Schemas/User');

const mongoose = require('mongoose');

const connect =   () => {

    return new Promise((resolve) => {
        mongoose.connect('mongodb://127.0.0.1:27017');

        mongoose.connection.on('open', () => {
            console.log('succeed connect database');

            resolve();
        });
    });
    
};

module.exports = {
    connect,
};