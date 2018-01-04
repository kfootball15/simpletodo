'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const Todolist = mongoose.model('Todolist');
const User = mongoose.model('User');
module.exports = router;

const path = require('path');

function createUser (user) {
	return User.create({
		username: user.username,
		email: user.username + "@gmail.com"
	})
}

function createTodolist (todolist) {
	return Todolist.create(todolist)
}

router.post('/:title/:owner', function(req, res, next) {

	var toSendTodolist;
    //1. First we need to check if a todolist with this "username" already exists.
    Todolist.find({title: req.params.title, owner: req.params.owner})
    .then(function(todolistExists){
        if(todolistExists[0]){
            res.status(200).send(todolistExists[0]);
        } else {
            return createTodolist({ owner:req.params.owner, title: req.params.title})
        }
    })
    .then(function(newTodolist) {
    	if(newTodolist){
    		toSendTodolist = newTodolist;
		    return User.update(	{ _id: req.params.owner },
		    					{ $push: { 'todolists': newTodolist }}, 
		    	                function(err, info) {console.log("ERROR Updating User: ", err, info)})
    	}
    })
    .then(function(updatedUser){
	    if(toSendTodolist) res.status(201).send(toSendTodolist);
    })
    .catch(next);

});

router.get('/:userId/:todolistTitle', function(req, res, next){
	console.log("title", req.params.todolistTitle, "owner", req.params.userId)
	Todolist.find({title: req.params.todolistTitle, owner: req.params.userId})
	.populate('todos')
	.exec()
	.then(function(todolists){
		console.log(todolists)
		res.status(200).send(todolists);
	})
})

router.get('/:userId', function(req, res, next){
	//res.sendFile(path.join(__dirname, '..', 'todolists.json'));
	User.findById(req.params.userId)
	.populate('todolists')
	.exec() //using this method ensures we are returned a real A+ conformant promise and not a mongoose 'promise'
	.then(function(user){
		console.log("USER:", user)
		res.status(200).send(user)
	})
	.catch(next)
})
