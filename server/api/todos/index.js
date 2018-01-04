'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const Todolist = mongoose.model('Todolist');
const Todo = mongoose.model('Todo');
const User = mongoose.model('User');
const Promise = require('bluebird');
module.exports = router;

function createTodo (todo) {
	return Todo.create(todo)
}

function findTodolist (todolistTitle, todolistUserId) {
	console.log("Find This Todolist by Title and Owner", todolistTitle)
	return Todolist.findOne({title: todolistTitle, owner: todolistUserId})
}

router.get('/:todoId', function(req, res, next){
	console.log("Got into: /api/userId/listId")
	res.sendFile(path.join(__dirname, 'todolist.json'));
})

router.post('/:ownerTitle/:userId', function(req, res, next){
	console.log("Got into: /api/todos/userId/listId", req.params, req.body)
	// res.sendFile(path.join(__dirname, 'todolist.json'));
	findTodolist(req.params.ownerTitle, req.params.userId)
	.then(function(foundTodolist){
		if(foundTodolist){
			req.body.owner = foundTodolist._id;
			return createTodo(req.body);
		}
	})
	.then(function(todo){
		console.log("todo after create:", todo)
		return Todolist.update(	{ _id: todo.owner },
								{ $push: { 'todos': todo } }, 
								function(err, info) {console.log("ERROR: ", err, info)})
	})
	.catch(function(err){
		console.log("ERROR:", err)
	})
})

// router.post('/:title/:ownerId', function(req, res, next) {
// 	console.log("POST /" + req.params.title + "/" + req.params.ownerId);

//     createTodolist(req.params)
//     .then(function(newTodolist) {
//     	User.update({
//     		_id: req.params.ownerId
//     	},{
//     		$push: {
//     			'todos': newTodolist
//     		}
//     	}, function(err, info) {console.log("ERROR: ", err, info)})
//         res.status(201).send(newTodolist);
//     })
//     .catch(next);
// });
