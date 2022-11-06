const Router  = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
const { verify, getToken } = require('../../helpers/token');
//const { getBody } = require('../../helpers/utils/index');

const User = mongoose.model('User');
const Character = mongoose.model('Character');

const router = new Router({
    prefix: '/user',
});


router.get('/list', async (ctx) => {
    let {
        page,
        size,
        keyword,
    } = ctx.query;
   

    page = Number(page);
    size = Number(size);

    const query = {};

    if (keyword) {
        query.account = keyword;
    }

    
    const list = await User
        .find(query)
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await User.countDocuments().exec();


    ctx.body = {
        msg: 'Get the list successfully',
        data: {
            list,
            page,
            size,
            total,
        },
        code: 1,
    };

});
router.delete('/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;

    const delMsg = await User.deleteOne({
        _id: id,
    });

    ctx.body = {
        data: delMsg,
        code: 1,
        msg: 'Delete successfully'
    };
});
router.post('/add', async (ctx) => {
    const {
        account,
        password, 
        character,    
    } = ctx.request.body;

    const char = await Character.findOne({
        _id: character,
    });

    if (!char) {
        ctx.body = {
        msg: 'Error',
        code: 0,
        };
        return; 
    }
  

    const user = new User({
        account,
        password: password || '123123',
        character,
    });

    const res = await user.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: 'Add successfully'
    };
});

router.post('/reset/password', async (ctx) => {
    const {
        id,
    } = ctx.request.body;

    const user = await User.findOne({
        _id: id,
    }).exec();

    if (!user) {
        ctx.body = {
            msg: 'User not found',
            code: 0,
        };

        return;
    }

    user.password = config.DEFAULT_PASSWORD;

    const res = await user.save();  


    ctx.body = {
        msg: 'Reset successfully',
        data: {
            account: res.account,
            _id: res._id,
        },
        code: 1,
    }
});

router.post('/update/character', async (ctx) => {
    const {
        character,
        userId,
    } = ctx.request.body;

    const char = await Character.findOne({
        _id: character,
    });

    if (!char) {
        ctx.body = {
        msg: 'Error',
        code: 0,
        };

        return;
    }

    const user = await User.findOne({
        _id: userId,
    });

    if (!char) {
        ctx.body = {
        msg: 'Error',
        code: 0,
        };

        return;
    }

    user.character = character;

    const res = await user.save();
    ctx.body = {
        data: res,
        code: 1,
        msg: 'Edit successfully',
    };

});
 router.get('/info', async (ctx) => {
    ctx.body = {
        data: await verify(getToken(ctx)),
        code: 1,
        msg: 'Get successfully',
    };


 });
    
 
module.exports = router;

