/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: '../.././config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('DB connection established');
  });

//Read Json Data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import data
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully created');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete All Data From DB
const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteAllData();
}

// console.log(process.argv);
