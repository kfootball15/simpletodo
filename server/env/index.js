var path = require('path');
var devConfigPath = path.join(__dirname, 'development.js');
var productionConfigPath = path.join(__dirname, 'production.js');

if (process.env.NODE_ENV === 'production') {
	var productionPath = require(productionConfigPath);
	console.log("At least we got here...", productionPath)
    module.exports = productionPath;
} else {
    module.exports = require(devConfigPath);
}

//process.env.NODE_ENV = 'production'
//process.env.MONGOLAB_URI = 'mongodb://heroku_dtz62txz:ru5aa881b398m9ivsnag88qika@ds125628.mlab.com:25628/heroku_dtz62txz'
