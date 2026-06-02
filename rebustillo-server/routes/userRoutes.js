const express = require('express');
const { getUsers, createUser, updateUser, deleteUser, loginUser } = require('../controller/userController');

const router = express.Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:id').put(updateUser).delete(deleteUser);

router.post('/login', loginUser);

module.exports = router;