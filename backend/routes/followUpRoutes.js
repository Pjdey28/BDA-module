const express = require('express');

const router = express.Router();

const authMiddleware =
  require('../middleware/authMiddleware');

const {
  createFollowUp,
  getFollowUps,
  updateFollowUp,
  deleteFollowUp
} = require('../controllers/followUpController');

router.post(
  '/',
  authMiddleware,
  createFollowUp
);

router.get(
  '/',
  authMiddleware,
  getFollowUps
);

router.put(
  '/:id',
  authMiddleware,
  updateFollowUp
);

router.delete(
  '/:id',
  authMiddleware,
  deleteFollowUp
);

module.exports = router;