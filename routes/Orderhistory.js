const express = require('express');
const router = express.Router();

const {createOrder,getOrder,History } = require('../controllers/orderController.js')


//create route for orderhistory
router.post('/createorder', createOrder);
router.get('/history' ,History);
// router.get('/:orderID', getOrder);




module.exports = router;