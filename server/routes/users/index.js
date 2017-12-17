'use strict';
const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = router;
const _ = require('lodash');


router.post('/:username', function(req, res, next) {
	console.log("create user post:", req.params.username)
    User.create({
    	username: req.params.username,
    	email: req.params.username + "@gmail.com"
    })
    .then(function(newUser) {
        res.status(201).send(newUser);
    })
    .catch(next);
});

router.get('/:userId', function(req, res, next){
	console.log("Got into: /api/userId", req.body)
	res.sendFile(path.join(__dirname, 'todolists.json'))
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