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

function isValidTodoTitle (title) {
	const todoTitleRegex = /^[a-zA-Z0-9_ ]+$/
	if (title.length >= 2 && title.length <= 20 && todoTitleRegex.test(title)) {
		return true;
	} else {
		return false;
	}
}

function findTodolist (todolistTitle, todolistUserId) {
	return Todolist.findOne({title: todolistTitle, owner: todolistUserId})
}

function invalidTitleErrorHandler (res) {
	//HTTP Status 422 represents an "Unprocessable Entity", which seems most appropriate for an invalid username
	res.status(422).send({
		error: "Please enter a valid Title and Description.", 
		explanation: "Todo Titles and Descriptions must be between 2 and 20 characters, and may not contain spaces or special characters."
	})
}

// Create or fetch a todo item
router.post('/:ownerTitle/:userId', function(req, res, next){
	
	var newTodo;

	if (isValidTodoTitle(req.body.title)){
		findTodolist(req.params.ownerTitle, req.params.userId)
		.then( foundTodolist => {
			if(foundTodolist){
				req.body.owner = foundTodolist._id;
				return createTodo(req.body);
			}
		})
		.then( todo => {
			newTodo = todo;
			return Todolist.update(	{ _id: todo.owner },
									{ $push: { 'todos': todo } })
		})
		.then( updatedTodolist => {
			res.status(201).send(newTodo)
		})
		.catch(next)
	} else {
		invalidTitleErrorHandler(res);
	}
})

router.delete('/:todoId', function(req, res, next){
	Todo.find({_id:req.params.todoId})
	.remove()
	.exec()
	.then( deletedItem => {
		res.status(202).send(deletedItem)
	})
	.catch(next)
})

router.put('/:todoId', function (req, res, next){
	Todo.findByIdAndUpdate(req.params.todoId, {title: req.body.title, description: req.body.description, isCompleted: req.body.isCompleted}, {new: true})
	.then( updatedTodo =>{
		res.status(200).send(updatedTodo)
	})
	.catch(next)
})