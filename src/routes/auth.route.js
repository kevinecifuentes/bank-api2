const express = require('express');

//controllers
const authControllers = require('./../controllers/auth.controllers');

const router = express.Router();

router
  .post('/signup', authControllers.createUser)
  .post('/login', authControllers.loginUser);

module.exports = router;
