const Router  = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
//const { getBody } = require('../../helpers/utils/index');
const InviteCode = mongoose.model('InviteCode');

const router = new Router({
    prefix: '/invite',
});

router.post('/add', async (ctx) =>{
    const {
        count = 1,
    } = ctx.request.body;

    const arr = [];

    for (let i = 0; i < count; i++) {
        arr.push({
            code: uuidv4(),
            user: '',
        });
    }

    const res = await InviteCode.insertMany(arr);
    
    
    ctx.body = {
        code: 1,
        data: res,
        msg: 'Created successfully',
    };
});

router.get('/list', async (ctx) =>{
    let {
        page,
        size
    } = ctx.request.query;

    page = Number(page);
    size = Number(size);

    const list = await InviteCode
        .find()
        .sort({
            _id: -1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

        const total = await InviteCode.countDocuments();

        ctx.body = {
            code: 1,
            data: {
                list,
                total,
                page,
                size,
            },
            msg: 'Get list successfully',
        };
});

router.delete('/:id', async (ctx) =>{
    const {
        id,
    } = ctx.params;

    const res = await InviteCode.deleteOne({
        _id: id,
    });

    ctx.body = {
        code: 1,
        data: res,
        msg: 'Delete successfully',
    };
});

    
 
module.exports = router;

