'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    }
    // todolists: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Todolist'
    // }] //This is a reference to todolist model, and will be an array of todolists
});

// Example pre hook
// schema.pre('save', function (next) {
//     next();
// });

// Example Static Method
// schema.statics.generateSalt = () => {...};

mongoose.model('User', schema);