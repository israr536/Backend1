const express = require('express');
const router = express.Router();
const {createPost,getCustomerHistory,getOrder,updateOrder} = require('../controllers/customerController.js')

router.post('/createpost', createPost);
router.get('/postalhistory' , getCustomerHistory);
router.get('/:OrderID', getOrder);
router.put('/update',updateOrder)


// router.post('/history', History );
// router.put('/status', Update);

module.exports = router;