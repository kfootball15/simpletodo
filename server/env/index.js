var path = require('path');
var devConfigPath = path.join(__dirname, 'development.js');
var productionConfigPath = path.join(__dirname, 'production.js');
process.env.NODE_ENV = 'production'
process.env.MONGOLAB_URI = 'mongodb://heroku_dtz62txz:ru5aa881b398m9ivsnag88qika@ds125628.mlab.com:25628/heroku_dtz62txz'
if (process.env.NODE_ENV === 'production') {
	console.log("shoulve", productionConfigPath)
    module.exports = require(productionConfigPath);
} else {
	console.log("Should not have")
    module.exports = require(devConfigPath);
}