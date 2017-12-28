'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const Todolist = mongoose.model('Todolist');
const Promise = require('bluebird');
module.exports = router;


router.get('/:todoId', function(req, res, next){
	console.log("Got into: /api/userId/listId")
	res.sendFile(path.join(__dirname, 'todolist.json'));
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