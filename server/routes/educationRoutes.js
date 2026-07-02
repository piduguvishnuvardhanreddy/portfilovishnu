const express = require('express');
const router = express.Router();
const { 
  getEducations, 
  createEducation, 
  updateEducation, 
  deleteEducation 
} = require('../controllers/educationController');
const protect = require('../middleware/auth');

router.route('/')
  .get(getEducations)
  .post(protect, createEducation);

router.route('/:id')
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

module.exports = router;
