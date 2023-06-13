const mongoose = require('mongoose')

OrderSchema = new mongoose.Schema({
    orderID:{
        type:String,
        required:true,
        //unique:true
    },
    status:{
        type:String,
        required:true,

    },
    date: {
      type: String,
      default: Date.now,
      required: true,
    },
    
      // time: {
      //   type: String,
      //   required: true,
      // },
      location: {
        type: String,
        required: true,
      },
      mobilenumber:{
        type:String,
        required:true,
      },
      address:{
        type:String,
        required:true,
      },
      pincode:{
        type:String,
        required:true,
      }

});
const OrderModel = new mongoose.model('Order', OrderSchema)
module.exports = OrderModel;