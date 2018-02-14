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
	return Todolist.findOne({title: todolistTitle, owner: todolistUserId})
}

router.get('/:todoId', function(req, res, next){
	res.sendFile(path.join(__dirname, 'todolist.json'));
})

//createTodolistItem
router.post('/:ownerTitle/:userId', function(req, res, next){
	var newTodo;

	findTodolist(req.params.ownerTitle, req.params.userId)
	.then(function(foundTodolist){
		if(foundTodolist){
			req.body.owner = foundTodolist._id;
			return createTodo(req.body);
		}
	})
	.then(function(todo){
		newTodo = todo;
		return Todolist.update(	{ _id: todo.owner },
								{ $push: { 'todos': todo } })
	})
	.then(function(updatedTodolist){
		res.status(201).send(newTodo)
	})
	.catch(function(err){
		console.log("ERROR:", err)
	})
})

router.delete('/:todoId', function(req, res, next){
	Todo.find({_id:req.params.todoId})
	.remove()
	.exec()
	.then((deletedItem) => {
		res.status(202).send(deletedItem)
	})
	.catch(next)
})

router.put('/:todoId', function (req, res, next){
	Todo.findByIdAndUpdate(req.params.todoId, {title: req.body.title, description: req.body.description, isCompleted: req.body.isCompleted}, {new: true})
	.then((updatedTodo)=>{
		res.status(200).send(updatedTodo)
	})
})