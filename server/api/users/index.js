'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = router;

const path = require('path');
const _ = require('lodash');

function createUser (user) {
	return User.create({
		username: user.username,
		email: user.username + "@gmail.com"
	})
}

router.post('/:username', function(req, res, next) {
	//Create our user
    createUser(req.params)
    .then(function(newUser) {
        res.status(201).send(newUser);
    })
    .catch(next);
});

router.get('/:username', function(req, res, next){
	//If the user has typed a username into the URL, we want to either find that username or (if it does not exist) we want to create that username
	User.findOne(req.params)
	.then(function(user){
		if (user) res.status(200).send(user); //User exists, so lets send it
		else return createUser(req.params); //User does not exist, so lets create it
	})
	.then(function(newUser){
		if(newUser) res.status(201).send(newUser);
	})
	.catch(function(err){
		console.log("Our Error", err);
	});
})