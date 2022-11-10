const Router  = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
const { verify, getToken } = require('../../helpers/token');
//const { getBody } = require('../../helpers/utils/index');

const User = mongoose.model('User');

const router = new Router({
    prefix: '/profile',
});


router.post('/update/password', async (ctx) => {
    const {
        password,
        oldPassword,
    } = ctx.request.body;

    const payload = await verify(getToken(ctx));
    const { _id } = payload;

    const user = await User.findOne({
        _id,
    }).exec();

    if (!user) {
        ctx.body = {
            msg: 'User does not exist',
            code: 0,
        };
        return;
    }

    if (user.password !== oldPassword) {
        ctx.body = {
            msg: 'Password verification failed',
            code: 0,
        };
        return;
    }

    user.password = password;

    await user.save();

    ctx.body = {
        msg: 'Edit successfully',
        code: 1,
    };


});


 
module.exports = router;

