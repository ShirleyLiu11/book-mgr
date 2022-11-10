const Router  = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
//const { getBody } = require('../../helpers/utils/index');
const BookClassify = mongoose.model('BookClassify');

const router = new Router({
    prefix: '/book-classify',
});

router.get('/list', async (ctx) => {
    const list = await BookClassify
        .find()
        .sort({
            _id: -1,
        })
        .exec();

    ctx.body = {
        data: list,
        coed: 1,
        msg: 'Get list successfully',
    };
});

router.post('/add', async (ctx) => {

    const {
        title,
    } = ctx.request.body;
    
    const one = await BookClassify.findOne({
        title,
    }).exec();

    if (one) {
        ctx.body = {
            coed: 0,
            msg: 'Book category already exists',
        };
        return;
    }

    const bookClassify = new BookClassify({
        title,
    });

    const saved = await bookClassify.save();

    ctx.body = {
        data: saved,
        coed: 1,
        msg: 'Created successfully',
    };
   
});

router.delete('/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;

    const res = await BookClassify.deleteOne({
        _id: id,
    });

    ctx.body = {
        data: res,
        coed: 1,
        msg: 'Delete successfully',
    };
});

router.post('/update/title', async (ctx) => {
    const {
        id,
        title,
    } = ctx.request.body;

    const one = await BookClassify.findOne({
        _id: id,
    });

    if (!one) {
        ctx.body = {
            coed: 0,
            msg: 'Category does not exist',
        };
        return;
    }
    
    one.title = title;

    const res = await one.save();

    ctx.body = {
        data: res,
        coed: 1,
        msg: 'Edit successfully',
    };
   
});

 
module.exports = router;

