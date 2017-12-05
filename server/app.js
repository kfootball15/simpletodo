// const fs = require('fs');
// const _ = require('lodash');
// const yargs = require('yargs');

// const notes = require('./app/notes');

// var argv = yargs.argv
// var command = argv._[0];

// // var jsonObject = jsonify.jsonify(argv.obj);
// // var jsObject = jsonParser.jparse(jsonObject);


// if(command === "add"){
// 	var note = notes.addNote(argv.title, argv.body);
// 	var message = note ? `Your note, "${note.title}", was successfully created.` : "ERROR: This note is a duplicate"
// 	console.log(message);
// } else if (command === "list"){
// 	var allNotes = notes.getAll();
// 	var message = allNotes.length ? `We Have received all of your notes: ${allNotes}` : 'You have not yet created any notes'
// 	console.log(message);
// } else if (command === "read"){
// 	var fetchedNote = notes.getNote(argv.title);
// 	var message = fetchedNote ? `Your note, ${fetchedNote.title}, has been received.` : `A note with the title "${argv.title}" does not exist.`
// 	console.log(message);
// } else if (command === "remove"){
// 	var deletedNote = notes.removeNote(argv.title);
// 	var message = deletedNote ? `Your note, "${deletedNote.title}", has been successfully deleted` : `A note with the title "${argv.title}" does not exist`
// 	console.log(message)
// } else {
// 	console.log("Command not recognized");
// }

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express() //init our express app

hbs.registerPartials(__dirname + '/views/partials')
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

app.listen(3000,()=>{
	console.log("Server listening on Port 3000")
}) 	//Bind our application to a port on our machine
	// app will listen to requests until you cancel the server process in the terminal
