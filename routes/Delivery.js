 const express = require('express');
const router = express.Router();
const { History,Update } = require('../controllers/deliveryController.js');


// router.get('/list' , list)
 router.post('/history', History );
router.put('/status', Update);

module.exports = router;