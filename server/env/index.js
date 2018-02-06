var path = require('path');
var devConfigPath = path.join(__dirname, 'development.js');
var productionConfigPath = path.join(__dirname, 'production.js');

// if (process.env.NODE_ENV === 'production') {
// 	console.log("shoulve")
    module.exports = require(productionConfigPath);
// } else {
// 	console.log("Should not have", process.env.NODE_ENV)
//     module.exports = require(devConfigPath);
// }