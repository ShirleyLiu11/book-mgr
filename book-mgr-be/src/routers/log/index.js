const Router  = require('@koa/router');
const mongoose = require('mongoose');
//const { getBody } = require('../../helpers/utils/index');
const Log = mongoose.model('Log');

const router = new Router({
    prefix: '/log',
});

router.get('/list', async (ctx) => {
    let {
        page,
        size,
    } = ctx.query;

    // console.log(page,size);

    page = Number(page);
    size = Number(size);

    const list = await Log
        .find({
            show: true,
        })
        .sort({
            _id: -1,
        })
        .skip((page-1) * size)
        .limit(size)
        .exec();

    const total = await Log.countDocuments().exec();

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

router.post('/delete',  async (ctx) => {
    const {
        id,
    } = ctx.request.body;

    const one = await Log.findOne({
        _id: id,
    }).exec();

    if (!one) {
        ctx.body = {
            data: {},
            msg: 'Delete successfully',
            code: 0,
        };
        return;
    }

    one.show = false;
     
    await one.save();
    
    ctx.body = {
        code: 1,
        msg: 'Delete successfully',
    };
});


module.exports = router;

