const express = require('express');
const router = express.Router();
const customerControllers = require('../controllers/customer.controller');

router.get('/', customerControllers.listCustomer);
router.post('/', customerControllers.addCustomer);
router.put('/:id', customerControllers.editCustomer);
router.delete('/:id', customerControllers.deleteCustomer);

module.exports = router;
