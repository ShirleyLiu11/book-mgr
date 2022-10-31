const Router  = require('@koa/router');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const router = new Router({
    prefix: '/auth',
});

router.post('/register', async (ctx) => {
    const {
        account,
        password,
    } = ctx.request.body

    const one = User.findOne({
        account,
    }).exec();

    if (one) {
        ctx.body = {
            code: 0,
            msg: 'The user already exists.',
            data: null,
        };
        return;
    }
    

    const user = new User({
        account,
        password,
    });

    const res = await user.save();
    
    ctx.body = {
        code: 1,
        msg: 'register succeed',
        data: res,
    };
    
});

router.post('/login', async (ctx) => {
    
    ctx.body = 'Login Succeed';
});
 
module.exports = router;

