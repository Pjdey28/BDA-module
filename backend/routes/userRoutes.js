const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  getEmployees
} = require('../controllers/userController');

router.get('/', authMiddleware, getEmployees);

module.exports = router;