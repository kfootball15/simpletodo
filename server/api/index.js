const router = require('express').Router();
const path = require('path');
module.exports = router; //We MUST export our router so that it can be required in our app.js file

router.use('/users', require('./users/'))
router.use('/todolists', require('./todolists/'));
router.use('/todos', require('./todos'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});