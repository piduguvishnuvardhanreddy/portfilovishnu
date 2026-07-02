const express = require('express');
const router = express.Router();
const { 
  submitContact, 
  getMessages, 
  deleteMessage 
} = require('../controllers/contactController');
const protect = require('../middleware/auth');

router.route('/')
  .post(submitContact)
  .get(protect, getMessages);

router.route('/:id')
  .delete(protect, deleteMessage);

module.exports = router;
