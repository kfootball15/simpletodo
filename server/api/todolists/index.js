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
    .then((todolistExists) => {
        if(todolistExists[0]){
            res.status(200).send(todolistExists[0]);
        } else {
            return createTodolist({ owner:req.params.owner, title: req.params.title})
        }
    })
    .then((newTodolist) => {
    	if(newTodolist){
    		toSendTodolist = newTodolist;
		    return User.update(	{ _id: req.params.owner },
		    					{ $push: { 'todolists': newTodolist }}, 
		    	                function(err, info) {console.log("ERROR Updating User: ", err, info)})
    	}
    })
    .then((updatedUser) => {
	    if(toSendTodolist) res.status(201).send(toSendTodolist);
    })
    .catch(next);

});

router.get('/:userId/:todolistTitle', function(req, res, next){
	console.log("title", req.params.todolistTitle, "owner", req.params.userId)
	Todolist.find({title: req.params.todolistTitle, owner: req.params.userId})
	.populate('todos')
	.exec()
	.then((todolists) => {
		//^SHOULD THIS BE TODOLISTS OR TODOLIST (SINGULAR)
		console.log(todolists)
		//if(todolists){
		res.status(200).send(todolists);
		//} else { 
		//	CREATE A NEW TODOLIST WITH GIVEN TITLE AND SEND IT BACK 
		//}
	})
	.catch(next)
})

router.get('/:userId', function(req, res, next){
	User.findById(req.params.userId)
	.populate('todolists')
	.exec() //using this method ensures we are returned a real A+ conformant promise and not a mongoose 'promise'
	.then((user) => {
		console.log("USER:", user)
		res.status(200).send(user)
	})
	.catch(next)
})

router.delete('/:todolistId', function(req, res, next){
	Todolist.find({_id: req.params.todolistId })
	.remove()
	.exec()
	.then((deletedItem) => {
		res.status(202).send(deletedItem)
	})
	.catch(next)
})

router.put('/:todolistId', function (req, res, next){
	Todolist.findByIdAndUpdate(req.params.todolistId, {title: req.body.title, isCompleted: req.body.isCompleted}, {new: true})
	.then((updatedTodolist)=>{
		res.status(200).send(updatedTodolist)
	})
})
