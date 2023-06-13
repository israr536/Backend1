const express = require('express');
const router = express.Router();
const {createPost,getCustomerHistory} = require('../controllers/customerController')

router.post('/createpost', createPost);
router.get('/postalhistory' , getCustomerHistory);



module.exports = router;