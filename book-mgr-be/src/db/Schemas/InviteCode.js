const mongoose = require('mongoose');
const { getMate } = require('../helpers');

const InviteCodeSchema = new mongoose.Schema({
    //invite code
    code: String,
    //which account are use for
    user: String,
    
    meta: getMate(),
});


mongoose.model('InviteCode', InviteCodeSchema);

