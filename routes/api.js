var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond from api');
});

router.use('/books', require('./book'));
router.use('/customers', require('./customer'));
router.use('/transactions', require('./transaction'));

module.exports = router;
