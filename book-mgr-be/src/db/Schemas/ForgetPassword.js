const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const ForgetPasswordSchema = new mongoose.Schema({
    account: String,

    //1: To be processed
    //2: Already reset
    //3: Ignore
    status: Number,

    

    meta: getMeta(),
});

ForgetPasswordSchema.pre('save', preSave);


mongoose.model('ForgetPassword', ForgetPasswordSchema);

