const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

const port = 3000;

// app.get('/', (req, res) => {
//     res.status(200).json({Message: 'Hello form the server!', app: 'Natours'});
// });

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint');
// });
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.post('/api/v1/tours', (req, res) => {
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

});

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results:tours.length,
        data:
        {
            tours
        }
    })
})

app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    res.status(200).json({
        status: 'success',
        // results:tours.length,
        // data:
        // {
        //     tours
        // }
    })
})


app.listen(port,()=>{
    console.log(`Server listening on ${port}`);
});

