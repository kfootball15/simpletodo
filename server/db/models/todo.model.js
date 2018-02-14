'use strict';

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    title: String,
    description: String,
    list: [String],
    isCompleted: {
    	type: Boolean,
    	default: false
    },
    owner: { //These todo items will be owned by specific lists
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todolist'
    }
});

mongoose.model('Todo', schema);
schema.plugin(deepPopulate);

