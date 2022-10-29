const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    age: Number,
});

const UserModel = mongoose.model('User', UserSchema);

const connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017');

    mongoose.connection.on('open', () => {
        console.log('succeed connect');

        const user = new UserModel({
            nickname: 'Nick',
            password: '123456',
            age: 12,
        });

        user.save();
    });
};

connect();