const Router  = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
const ForgetPassword = mongoose.model('ForgetPassword');
const User = mongoose.model('User');

const router = new Router({
    prefix: '/forget-password',
});

router.get('/list', async (ctx) => {
    let {
        page,
        size,
    } = ctx.request.query;

    page = Number(page);
    size = Number(size);



    const list = await ForgetPassword
        .find({
            status: 1,
         })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await ForgetPassword
        .find({
            status: 1,
         })
        .countDocuments()
        .exec();

    ctx.body = {
        data: {
            list,
            page,
            size, 
            total,
        },
        code: 1,
        msg: 'Get list successfully',
    };
});
router.post('/add', async (ctx) => {
    const {
        account,
    } = ctx.request.body;

    //the account should exist
    const user = await User.findOne({
        account,
    }).exec();

    if (!user) {
        ctx.body = {
            code: 1,
            msg: 'Apply successfully',
        };
        return;
    }

    //no "status = 1"'s docu in forget-password
    const one = await ForgetPassword.findOne({
        account,
        status: 1,
    }).exec();

    if (one) {
        ctx.body = {
            code: 1,
            msg: 'Apply successfully',
        };
        return;
    }

    const forgetPwd = new ForgetPassword({
        account,
        status: 1,
    });

    await forgetPwd.save();

    ctx.body = {
        code: 1,
        msg: 'Apply successfully',
    };
});
router.post('/update/status', async (ctx) => {
    const {
        id,
        status,
    } = ctx.request.body;

    const one = await ForgetPassword.findOne({
        _id: id,
    });

    if (!one) {
        ctx.body = {
            msg: 'Can not find this application',
            code: 0,
        };
        return;
    }

    one.status = status;

    if (status === 2) {
        const user = await User.findOne({
            account: one.account,
        }).exec();

        if (user) {
            user.password = config.DEFAULT_PASSWORD;

            await user.save();
        }
    }
    await one.save();
    ctx.body = {
        msg: 'Processed successfully',
        code: 1,
    };

    

});
    


    
 
module.exports = router;

