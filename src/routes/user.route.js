const express = require('express');

//controllers
const userControllers = require('./../controllers/user.controller');

const router = express.Router();

router.get('/:id/history', userControllers.getHistory);

module.exports = router;
