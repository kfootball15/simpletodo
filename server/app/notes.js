const jsonify = require('../notes/jsonify.js').jsonify;
const jsify = require('../notes/jsonParser.js').jsify;
const fs = require('fs');

var dir = "./notes/"

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json')
		return JSON.parse(notesString);
	} catch(e) {
		return [];
	}
}

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = { title, body };

	// If theres a duplicate we can put it into this array
	var duplicateNotes = notes.filter((note) => note.title === title)

	// If our duplicates array is EMPTY, we know our note is not a duplicate and can be saved
	if(duplicateNotes.length === 0){
		notes.push(note)
		saveNotes(notes)
		return note;
	}
}

var getAll = () => {
	return fetchNotes();
}

var getNote = (title) => {
	debugger;
	var notes = fetchNotes();
	// filter out the note we have requested
	theNoteWeWant = notes.filter((note) => note.title === title)
	// Send the only element of the array back
	return theNoteWeWant[0];
}

var removeNote = (title) => {
	var deletedNote;
	// Fetch All notes by return the JSON of notes array
	var notes = fetchNotes();
	// If the title we have entered exists, remove it from our temporary notes array
	var duplicateNotes = notes.filter((note) => {
		if(note.title !== title){
			return true;
		} else {
			deletedNote = note;
			return false;
		}
	});
	// Save the updated notes array
	saveNotes(duplicateNotes);
	// Return the note we have deleted
	return deletedNote;
}

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
}