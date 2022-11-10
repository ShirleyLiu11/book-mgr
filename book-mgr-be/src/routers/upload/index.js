const Router  = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
const { verify, getToken } = require('../../helpers/token');
const { saveFileToDisk } = require('../../helpers/upload');
const path = require('path');
//const { getBody } = require('../../helpers/utils/index');

const User = mongoose.model('User');
const Character = mongoose.model('Character');

const router = new Router({
    prefix: '/upload',
});


router.post('/file', async (ctx) => {

    const filename = `uuidv4()`
    const dir = await saveFileToDisk(ctx, path.resolve(config.UPLOAD_DIR, '1.xlsx'));

    ctx.body = {
        data: dir,
        code: 1,
        msg: '',
    }

});

    
 
module.exports = router;

