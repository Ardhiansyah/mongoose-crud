const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/book.controller');

router.get('/', bookControllers.listBook);
router.post('/', bookControllers.addBook);
router.put('/:id', bookControllers.editBook);
router.delete('/:id', bookControllers.deleteBook);

module.exports = router;
