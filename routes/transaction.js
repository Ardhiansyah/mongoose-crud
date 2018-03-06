const express = require('express');
const router = express.Router();
const transactionControllers = require('../controllers/transaction.controller');

router.get('/', transactionControllers.listTransaction);
router.post('/', transactionControllers.addTransaction);
router.put('/:id', transactionControllers.editTransaction);
router.delete('/:id', transactionControllers.deleteTransaction);

module.exports = router;
