'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }], //This will be a list of todos referencing individual todo items
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Todolist', schema);

