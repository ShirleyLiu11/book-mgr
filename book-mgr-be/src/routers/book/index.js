const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils/index');


const BOOK_CONST = {
    IN: 'IN_COUNT',
    OUT: 'OUT_COUNT',
};

const Book = mongoose.model('Book');
const InventoryLog = mongoose.model('InventoryLog');
const User = mongoose.model('User');


//find book 
const findBookOne = async (id) => {
    const one = await Book.findOne({
        _id: id,
    }).exec();

     return one;
};



const router = new Router({
    prefix: '/book',
});

router.post('/add', async (ctx) => {
    const {
        name, 
        price,
        author,
        publishDate,
        classify,
        count,

    } = getBody(ctx);

    const book = new Book({
        name, 
        price,
        author,
        publishDate,
        classify,
        count,

    });

    const res = await book.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: 'Add successfully',
    };
});

router.get('/list', async (ctx) => {
    const {
        page = 1,
        keyword = '',
    } = ctx.query;

    let = {
        size = 10,
    } = ctx.query;

    size = Number(size);

    const query = {};

    if (keyword) {
        query.name = keyword;
    }

    const list = await Book
        .find(query)
        .sort({
            _id: -1,
        })
        .skip((page-1) * size)
        .limit(size)
        .exec();

    const total = await Book.countDocuments();

    ctx.body = {
        data: {
            total,
            list,
            page,
            size,
        },
        code: 1,
        msg: 'Get the list successfully',
    };
});

router.delete('/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;

    const delMsg = await Book.deleteOne({
        _id: id,
    });

    ctx.body = {
        data: delMsg,
        msg: 'Delete successlly',
        code: 1,
    };
});

router.post('/update/count', async (ctx) => {
    const {
        id,
        type,
    } = ctx.request.body;

    let {
        num,
    } = ctx.request.body;

    num = Number(num);

    const book = await findBookOne(id);

    if (!book) {
        ctx.body = {
            code: 0,
            msg: 'No book found',
        };
        return;  
    }
    //found book
    if (type === BOOK_CONST.IN) {
        //stock in
        num = Math.abs(num);
    } else {
        //stock out
        num = -Math.abs(num);
    }

    book.count = book.count + num;

    if (book.count < 0) {
        ctx.body = {
            code: 0,
            msg: 'Insufficient stock for delivery'
        };
        return;
    }

    const res = await book.save();

    const log = new InventoryLog({
        num: Math.abs(num),
        type,
        title: book.name,
        bookId: book._id,   
        userId: user._id,    
    });
    console.log(book._id);

    log.save();

    ctx.body = {
        data: res,
        code: 1,
        msg: 'Operate successfully'
    };

     
});
router.post('/update', async (ctx) => {
    const {
        id,
        ...others
    } = ctx.request.body;


    const one = await findBookOne(id);

    //didnt find book
    if (!one) {
        ctx.body = {
            msg: 'No books found',
            code: 0,
        }
        return;
    }
    //found book
    const newQuery = {};
    Object.entries(others).forEach(([key, value]) => {
        if (value) {
            newQuery[key] = value;
        }
    });

    Object.assign(one, newQuery);

    const res = await one.save();
    ctx.body = {
        data: res,
        cpde: 1,
        msg: 'Save successfully',
    };
});
//Book detail
router.get('/detail/:id', async (ctx) => {
    const {
        id,
    } = ctx.params;
    //find book
    const one = await findBookOne(id);

    //didnt find book
    if (!one) {
        ctx.body = {
            msg: 'No books found',
            code: 0,
        };
        return;
    }
    ctx.body = {
        msg: 'Access detail successfully',
        data: one,
        code: 1,
    }

});
    



module.exports = router;