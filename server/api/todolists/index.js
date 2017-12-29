'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const Todolist = mongoose.model('Todolist');
const User = mongoose.model('User');
module.exports = router;

const path = require('path');


function createTodolist (todolist) {
	return Todolist.create(todolist)
}

router.post('/:title/:ownerId', function(req, res, next) {
	console.log("POST /" + req.params.title + "/" + req.params.ownerId);

    createTodolist(req.params)
    .then(function(newTodolist) {
    	User.update({
    		_id: req.params.ownerId
    	},{
    		$push: {
    			'todolists': newTodolist
    		}
    	}, function(err, info) {console.log("ERROR: ", err, info)})
        res.status(201).send(newTodolist);
    })
    .catch(next);
});

router.get('/:userId/:todolistId', function(req, res, next){
	console.log("POST /api/userId/todolistId")
	Todolist.findById(req.params.todolistId)
	.populate('todos')
	.exec()
	.then(function(todolist){
		res.status(200).send(todolist);
	})
	// res.sendFile(path.join(__dirname, '..', 'todolist.json'));
})

router.get('/:userId', function(req, res, next){
	console.log("GET /" + req.params.userId)
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