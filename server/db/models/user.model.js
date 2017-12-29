'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username: {
        type: String
    },
    todolists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todolist'
    }]
});

// Example pre hook
// schema.pre('save', function (next) {
//     next();
// });

// Example Static Method
// schema.statics.generateSalt = () => {...};

mongoose.model('User', schema);