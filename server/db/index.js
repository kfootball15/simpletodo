'use strict';
//var Promise = require('bluebird');
const path = require('path');
const chalk = require('chalk');

var DATABASE_URI = require(path.join(__dirname, '..', 'env')).DATABASE_URI;

const mongoose = require('mongoose');
// var db = mongoose.connect(DATABASE_URI,{
// 	useMongoClient: true
// })

// Promises returned from mongoose queries/operations are BLUEBIRD promises
mongoose.Promise = Promise;

// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./models');

// Modifying startDbPromise to return the db object to have an access to it when  .then on startDbPromise
// var startDbPromise = new Promise(function (resolve, reject) {
//     db.on('open', function () {
//     	resolve(db);
//     });
//     db.on('error', reject);
// });

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
console.log(DATABASE_URI, path.join(__dirname, '..', 'env'),  process.env.NODE_ENV)


// (function () {
//     console.log(chalk.green('MongoDB connection opened!'));
// })
// ;

module.exports = mongoose.connect(DATABASE_URI,{
	useMongoClient: true
})