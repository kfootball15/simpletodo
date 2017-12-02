const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./app/notes');

var argv = yargs.argv
var command = argv._[0];

// var jsonObject = jsonify.jsonify(argv.obj);
// var jsObject = jsonParser.jparse(jsonObject);


if(command === "add"){
	var note = notes.addNote(argv.title, argv.body);
	var message = note ? `Your note, "${note.title}", was successfully created.` : "ERROR: This note is a duplicate"
	console.log(message);
} else if (command === "list"){
	var allNotes = notes.getAll();
	var message = allNotes.length ? `We Have received all of your notes: ${allNotes}` : 'You have not yet created any notes'
	console.log(message);
} else if (command === "read"){
	var fetchedNote = notes.getNote(argv.title);
	var message = fetchedNote ? `Your note, ${fetchedNote.title}, has been received.` : `A note with the title "${argv.title}" does not exist.`
	console.log(message);
} else if (command === "remove"){
	var deletedNote = notes.removeNote(argv.title);
	var message = deletedNote ? `Your note, "${deletedNote.title}", has been successfully deleted` : `A note with the title "${argv.title}" does not exist`
	console.log(message)
} else {
	console.log("Command not recognized");
}