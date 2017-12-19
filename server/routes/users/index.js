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
	console.log("create user post:", req.params.username)

	//Create our user
    createUser(req.params)
    .then(function(newUser) {
        res.status(201).send(newUser);
    })
    .catch(next);
});

router.get('/:username', function(req, res, next){
	console.log("Got into: /api/userId", req.params)

	//If the user has typed a username into the URL, we want to either find that username or (if it does not exist) we want to create that username
	User.findOne(req.params)
	.then(function(user){
		console.log("We should not have found anything", user);
		if (user) res.status(200).send(user); //User exists, so lets send it
		else return createUser(req.params); //User does not exist, so lets create it
	})
	.then(function(newUser){
		res.status(201).send(newUser);
	})
	.catch(function(err){
		console.log("Our Error", err);
	});
	// res.sendFile(path.join(__dirname, '..', 'user.json'))

})

// router.get('/:userId', function(req, res, next) {

//     User.findOne({_id: req.params.userId})
//     .then(function(user) {
//         res.send(user);
//     })
//     .then(null, next);
// });

// router.delete('/:userId', function(req, res, next) {
//     User.findOneAndRemove({_id: req.params.userId})
//     .then(function(response) {
//         res.send(response);
//     })
//     .then(null, next);
// });

// router.put('/:userId', function(req, res, next){
//     if (req.body.password){
//         User.findById(req.params.userId)
//         .then(function(user){
//             user.password = req.body.password;
//             user.passwordReset = false;
//            return user.save()
//         })
//         .then(function(response){
//             res.send(response)
//         })
//         .then(null, next)
//     }
//     else {
//         User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
//         .then(function(response){
//             res.send(response)
//         })
//         .then(null, next)
//     }
// });

// router.put('/:userId/avatar', function(req, res, next) {
//     console.log('GOT INTO ROUTE AVATAR', req.body, req.params.userId)
//     User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
//     .then(function(updatedAvatar) {
//         console.log('new avatar in user/avatar route', updatedAvatar)
//         res.status(200).send(updatedAvatar);
//     })
//     .then(null, next)
// });