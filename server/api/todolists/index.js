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

function updateUser (userId, todolist) {
	return User.update({ _id: userId },
				{ $push: { 'todolists': todolist }}, 
                function(err, info) {
                	if (err) console.error("Error updated user", err);
                	else console.log("Successfully updated user", info)
                })
}

router.post('/:owner/:title', function(req, res, next) {
	
	var toSendTodolist;

    Todolist.find({title: req.params.title, owner: req.params.owner})
    .populate('todos')
	.exec()
    .then( todolistExists => {
        if(todolistExists[0]){
            res.status(200).send(todolistExists[0]); //Since we have found the existing todolist, we send it back
        } else {
            return createTodolist({ owner:req.params.owner, title: req.params.title}) //Since the requested todolist does not exist, we will create it.
        }
    })
    .then( newTodolist => {
    	if(newTodolist){
    		toSendTodolist = newTodolist;
		    return updateUser(req.params.owner, newTodolist)
    	}
    })
    .then( updatedUser => {
	    if(toSendTodolist) res.status(201).send(toSendTodolist);
    })
    .catch(next);

});

router.get('/:owner/:title', function(req, res, next){

	var toSendTodolist;

	Todolist.find({title: req.params.title, owner: req.params.owner})
	.populate('todos')
	.exec()
	.then( todolists => {
		if(todolists.length){
			res.status(200).send(todolists[0]);//Since the todolist exists we simply need to send it back to the user
		} else { 
			return createTodolist({ owner:req.params.owner, title: req.params.title})//Since we cannot find the requested todolist, lets create a new one and send it back 
		}
	})
	.then( newTodolist => {
    	if(newTodolist){
    		toSendTodolist = newTodolist;
		    return updateUser(req.params.owner, newTodolist)
    	}
    })
	.then( updatedUser => {
	    if(toSendTodolist) res.status(201).send(toSendTodolist);
    })
	.catch(next)
})

router.get('/:userId', function(req, res, next){
	User.findById(req.params.userId)
	.populate('todolists')
	.exec() //using this method ensures we are returned a real A+ conformant promise and not a mongoose 'promise'
	.then((user) => {
		res.status(200).send(user)
	})
	.catch(next)
})

router.delete('/:todolistId', function(req, res, next){
	Todolist.find({_id: req.params.todolistId })
	.remove()
	.exec()
	.then( deletedItem => {
		res.status(202).send(deletedItem)
	})
	.catch(next)
})

router.put('/:todolistId', function (req, res, next){
	Todolist.findByIdAndUpdate(req.params.todolistId, {title: req.body.title, isCompleted: req.body.isCompleted}, {new: true})
	.then( updatedTodolist => {
		res.status(200).send(updatedTodolist)
	})
	.catch(next)
})
