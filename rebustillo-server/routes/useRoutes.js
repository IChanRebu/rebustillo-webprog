const express = require('express');

// import functions
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controller/userController');

const router = express.Router();

// Define /login route BEFORE /:id to prevent route matching conflict
router.post('/login', loginUser);

router.route('/').get(getUsers).post(createUser);

router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;