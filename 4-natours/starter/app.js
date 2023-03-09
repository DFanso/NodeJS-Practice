const express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const port = 3000;


//(1) Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello From the middleware 👋🏻');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


//(2)Route handlers

//(3) Routes



app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);



//(4)Server 


module.exports = app;
