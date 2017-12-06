

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000; // Process.env is just an object that will store all of our environment variables. Since we are using Heroku, Heroku will need to set this for us, we cannot set it manually. For our local testing purposes, we can set it to 3000
const app = express() //init our express app

hbs.registerPartials(__dirname + '/../views/partials')
console.log(__dirname + '../views/partials')
app.set('view engine', 'hbs')

//HBS Helper Methods:
hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear()
})

//Some Middleware where we can log some information from the user
app.use((req, res, next)=>{
	var now = new Date().toString();

	var currentInfo = `${now}: ${req.method} ${req.url}`
	console.log(currentInfo)
	fs.appendFile(`./logs/server-log.json`, currentInfo + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	})
	next()
})

// UNCOMMENT this code when you want the app to render in maintenance mode:
// app.use((req, res, next)=>{
// 	res.render('./partials/maintenance.hbs', {
// 		currentDate: new Date().getFullYear()
// 	})
// })

// Serve our static public directory
app.use(express.static(__dirname +'/../public'))

app.get('/', (req, res, next)=>{
	res.render('home.hbs', {
		welcomeMessage: "WELCOME NEW USER"
	})
});

app.get('/about', (req,res,next)=>{
	res.render('about.hbs', {
		title: "About"
	})
})

app.listen(PORT ,()=>{
	console.log(`server listening on Port ${PORT}`)
}) 	//Bind our application to a port on our machine
	// app will listen to requests until you cancel the server process in the terminal
