const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000; // Process.env is just an object that will store all of our environment variables. Since we are using Heroku, Heroku will need to set this for us, we cannot set it manually. For our local testing purposes, we can set it to 3000
const app = express() //init our express app

app.set('indexHTMLPath', path.join(__dirname, 'index.html'));


//Some Middleware where we can log some information from the user
app.use((req, res, next)=>{
	var now = new Date().toString();

	var currentInfo = `${now}: ${req.method} ${req.url}`
	console.log(currentInfo)
	fs.appendFile(path.join(__dirname, 'logs/server-log.json'), currentInfo + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	})
	next()
})

// UNCOMMENT this code when you want the app to render in maintenance mode:
// app.use((req, res, next)=>{
// 		res.render('./partials/maintenance.hbs', {
// 			currentDate: new Date().getFullYear()
// 		})
//	 	//*NOTE that were are not including next() so that the application stalls out here
// })

// Serve our static public directory
app.use('/bower_components',  express.static(path.join(__dirname, '..', 'bower_components')));
app.use('/js',  express.static(path.join(__dirname, '..', 'js')));

app.use('/api', require('./routes'));

app.get('/', function (req, res) {
	res
		.status(200)
		.sendFile(app.get('indexHTMLPath'));
});


app.listen(PORT ,()=>{
	console.log(`server listening on Port ${PORT}`)
}); //Bind our application to a port on our machine
	// app will listen to requests until you cancel the server process in the terminal
