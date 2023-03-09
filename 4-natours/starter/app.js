const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

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

const port = 3000;


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));


//(2)Route handlers
const getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        results:tours.length,
        requestedAt: req.requestTime,
        data:
        {
            tours
        }
    })
}

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'error',
            message: 'Invalid id provided'
    })
    }
    res.status(200).json({
        status: 'success',
        data:
        {
            tour : tour
        }
    })
}

const createTour =  (req, res) => {
    //console.log(req.body);

    const newId = tours[tours.length - 1].id+1;
    const newTour = Object.assign({id: newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err => {
        res.status(201).json({
            status:'success',
            data:{
                tours: newTour
            }
        });
    })

}

const updateTour =  (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    if (id > tours.length) {
        return res.status(404).json({
            status: 'error',
            message: 'Invalid id provided'
    })
    }

    res.status(200).json({
        status: 'success',
        data:{
            tour: '<Updated Tour>'
        }
    })
}

const deleteTour =  (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    if (id > tours.length) {
        return res.status(404).json({
            status: 'error',
            message: 'Invalid id provided'
    })
    }
    res.status(204).json({
        status: 'success',
        data:{
            tour: null
        }
    })
}

const getAllUser = (req, res) => {
    res.status(500).json({
        statusbar: 'error',
        message: 'This route is not yet implemented'
    });
}

const createUser = (req, res) => {
    res.status(500).json({
        statusbar: 'error',
        message: 'This route is not yet implemented'
    });
}

const getUser = (req, res) => {
    res.status(500).json({
        statusbar: 'error',
        message: 'This route is not yet implemented'
    });
}

const updateUser = (req, res) => {
    res.status(500).json({
        statusbar: 'error',
        message: 'This route is not yet implemented'
    });
}

const deleteUser = (req, res) => {
    res.status(500).json({
        statusbar: 'error',
        message: 'This route is not yet implemented'
    });
}




// app.get('/api/v1/tours',getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

//(3) Routes
const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

tourRouter
.route('/')
.get(getAllTours)
.post(createTour)

tourRouter
.route('/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

userRouter
.route('/')
.get(getAllUser)
.post(createUser)

userRouter
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);


//(4)Server 
app.listen(port,()=>{
    console.log(`App listening on ${port}`);
});

