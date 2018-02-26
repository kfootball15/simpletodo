'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = router;

const path = require('path');
const _ = require('lodash');

function isValidUsername (username) {
	const usernameRegex = /^[a-zA-Z0-9_]+$/
	if (username.length >= 3 && username.length <= 20 && usernameRegex.test(username)) {
		return true;
	} else {
		return false;
	}
}

function invalidUsernameErrorHandler (res) {
	//HTTP Status 422 represents an "Unprocessable Entity", which seems most appropriate for an invalid username
	console.log("should get here too")
	res.status(422).send({
		error: "Please enter a valid Username.", 
		explanation: "Usernames must be between 3 and 20 characters, and may not contain spaces or special characters."
	})
}

function createUser (user) {
	return User.create({
		username: user.username,
		email: user.username + "@gmail.com"
	})
}

// Create User
router.post('/:username', function(req, res, next) {
	if(isValidUsername(req.params.username)){
	    createUser(req.params)
	    .then( newUser => {
	        res.status(201).send(newUser);
	    })
	    .catch(next);
	} else {
		invalidUsernameErrorHandler(res);
	}
});

router.get('/:username', function(req, res, next){
	//If the user has typed a username into the URL, we want to either find that username or (if it does not exist) we want to create that username
	if (isValidUsername(req.params.username)){
		User.findOne(req.params)
		.then( user => {
			if (user) res.status(200).send(user); //User exists, so lets send it
			else return createUser(req.params); //User does not exist, so lets create it
		})
		.then( newUser => {
			if(newUser) res.status(201).send(newUser);
		})
		.catch(next);
	} else {
		invalidUsernameErrorHandler(res);
	}
})