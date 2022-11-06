const Koa = require('koa');
const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const cors = require('@koa/cors');
const { middleware: koaJwtMiddleware, catchTokenError } = require('./helpers/token');
const { logMiddleware } = require('./helpers/log');
const app = new Koa();

connect().then(() => {

    app.use(cors());
    app.use(Body.koaBody());

    app.use(catchTokenError);

    koaJwtMiddleware(app);

    app.use(logMiddleware);

    registerRoutes(app);

      
    app.listen(3000, () => {
        console.log('succeed install');
    });

});





