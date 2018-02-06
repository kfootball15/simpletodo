'use strict';
const path = require('path');
const chalk = require('chalk');

var DATABASE_URI = require(path.join(__dirname, '..', 'env')).DATABASE_URI;

const mongoose = require('mongoose');

// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./models');

console.log(chalk.yellow('Opening connection to MongoDB . . .'));
console.log("Environment Variables:", DATABASE_URI,  process.env.NODE_ENV)

module.exports = mongoose.connect(DATABASE_URI,{
	useMongoClient: true
})