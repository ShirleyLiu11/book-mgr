const Router  = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');
const jwt = require('jsonwebtoken');
const config = require('../../project.config');

const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');

const router = new Router({
    prefix: '/auth',
});
//register
router.post('/register', async (ctx) => {
    const {
        account,
        password,
        inviteCode,
    } = getBody(ctx);


    //check form
    if (account === '' || password === '' || inviteCode === ''){
        ctx.body = {
            code: 0,
            msg: 'Field cannot be empty',
            data: null,
        };
        return;
    }

    //find if it have invite code
    const findCode = await InviteCode.findOne({
        code: inviteCode,
    }).exec();

    //if cannot find invitecode or the code is been used
    if ((!findCode) || findCode.user) {
        ctx.body = {
            code: 0,
            msg: 'Invitation code is incorrect',
            data: null,
        };

        return;
    }

    //Find the user whose account is the passed "account"
    const findUser = await User.findOne({
        account,
    }).exec();
    //check if there are users
    if (findUser) {
        //if there are, it means the user is exist
        ctx.body = {
            code: 0,
            msg: 'The user already exists',
            data: null,
        };
        return;
    }
    
    //create a user
    const user = new User({
        account,
        password,
    });
    //Sync created users to mongodb
    const res = await user.save();

    findCode.user = res._id;
    findCode.meta.updatedAt = new Date().getTime();

    await findCode.save();

    //Response succeeded
    ctx.body = {
        code: 1,
        msg: 'Register succeed',
        data: res,
    };
    
});
//login
router.post('/login', async (ctx) => {
    const {
        account,
        password,
    } = getBody(ctx);

    if (account === '' || password === ''){
        ctx.body = {
            code: 0,
            msg: 'Field cannot be empty',
            data: null,
        };
        return;
    }

    const one = await User.findOne({
        account,
    }).exec();
 
    if (!one) {
        ctx.body = {
            code: 0,
            msg: 'Wrong account or password',
            data: null,
        };

        return;
    }
    const user = {
        account: one.account,
        character: one.character,
        _id: one._id,
    };

    if (one.password === password) {
        ctx.body = {
            code: 1,
            msg: 'Login successful',
            data: {
                user,
                token: jwt.sign(user, config.JWT_SECRET),
            },
        };
        return;
    };

    ctx.body = {
        code: 0,
        msg: 'Wrong account or password',
        data: null,
    };
});
 
module.exports = router;

