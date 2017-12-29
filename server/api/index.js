const router = require('express').Router();
const path = require('path');
module.exports = router; //We MUST export our router so that it can be required in our app.js file

router.use('/users', require('./users/'))
router.use('/todolists', require('./todolists/'));
router.use('/todos', require('./todos'));

// router.get('/:userId', function(req, res, next){
// 	console.log("Got into: /api/userId")
// 	res.sendFile(path.join(__dirname, 'todolists.json'))
// })

// router.get('/:userId/:listId', function(req, res, next){
// 	console.log("Got into: /api/userId/listId")
// 	res.sendFile(path.join(__dirname, 'todolist.json'));
// })



// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});