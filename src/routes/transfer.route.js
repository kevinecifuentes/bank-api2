const express = require('express');

//controllers
const transferController = require('./../controllers/transfer.controller');

//routes
const router = express.Router();

router.post('/', transferController.sendTransfer);

module.exports = router;
