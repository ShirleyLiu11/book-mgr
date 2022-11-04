const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const InviteCodeSchema = new mongoose.Schema({
    //invite code
    code: String,
    //which account are use for
    user: String,
    
    meta: getMeta(),
});

InviteCodeSchema.pre('save', preSave);

mongoose.model('InviteCode', InviteCodeSchema);

