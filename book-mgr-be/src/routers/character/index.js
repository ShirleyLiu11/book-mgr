const Router  = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
//const { getBody } = require('../../helpers/utils/index');
const Character = mongoose.model('Character');

const router = new Router({
    prefix: '/character',
});


router.get('/list', async (ctx) => {
    const list = await Character.find().exec();

    ctx.body = {
        data: list,
        coed: 1,
        msg: 'Get list successfully',
    };
});

 
module.exports = router;

