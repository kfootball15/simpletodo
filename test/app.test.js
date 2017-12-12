const assert = require('assert');
const forecast = require('../server/playground/weatherapp/forecast/forecast');
const chalk = require('chalk');

// Test for tests -- make sure mocha is up and running
describe('Mocha', function() {
	it('If Mocha is working properly: should return -1 when the value is not present', function() {
		assert.equal(-1, [1,2,3].indexOf(4));
	});
});

describe('Forecast', function() {
	describe('getForecast()', function() {
		it('should return a number when you input some coordinates', function(done){
			forecast.getForecast({
				lat:41.469858,
				long:-71.298265
			})
			.then((results)=>{
				console.log("Forecast Results:", chalk.green(results));
				assert.equal("number", typeof results)
				done();
			})
			.catch((err)=>{
				console.log("Error:", chalk.red(err))
				done(err);
			})
		})
	})
});