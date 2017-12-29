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

router.get('/:todoId', function(req, res, next){
	console.log("Got into: /api/userId/listId")
	res.sendFile(path.join(__dirname, 'todolist.json'));
})

router.post('/:ownerId', function(req, res, next){
	console.log("Got into: /api/userId/listId", req.params, req.body)
	// res.sendFile(path.join(__dirname, 'todolist.json'));
	createTodo(req.body)
	.then(function(todo){
		console.log("todo after create:", todo)
		return Todolist.update({
			_id: todo.owner
		}),{
    		$push: {
    			'todolists': todo
    		}
    	}, function(err, info) {console.log("ERROR: ", err, info)}
	})
	.then(function(updatedTodolist){

	})
})

router.post('/:title/:ownerId', function(req, res, next) {
	console.log("POST /" + req.params.title + "/" + req.params.ownerId);

    createTodolist(req.params)
    .then(function(newTodolist) {
    	User.update({
    		_id: req.params.ownerId
    	},{
    		$push: {
    			'todos': newTodolist
    		}
    	}, function(err, info) {console.log("ERROR: ", err, info)})
        res.status(201).send(newTodolist);
    })
    .catch(next);
});

// router.get('/:squareId', function(req, res, next){
// 	Todolist.findById(req.params.squareId)
//     .populate('creator')
// 	.then(function(square){
// 		res.status(200).send(square);
// 	})
// 	.catch(next)
// })


// router.put('/:squareId', function(req, res, next){
// 	Todolist.findByIdAndUpdate(req.params.squareId, {$set: {'finalImage': req.body.finalImage}}, {new: true})
// 	.then(function(updatedSquare){
// 		res.status(200).send(updatedSquare);
// 	})
// 	.catch(next);
// })