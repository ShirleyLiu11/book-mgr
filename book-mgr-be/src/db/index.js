require('./Schemas/User');
require('./Schemas/InviteCode');
require('./Schemas/Book');
require('./Schemas/InventoryLog');
require('./Schemas/Character');
require('./Schemas/Log');



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