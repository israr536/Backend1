const mongoose = require('mongoose')


CustomerSchema = new mongoose.Schema({
    senderName:{
        type:String,
        required:true
    },
    senderAddress:{
        type:String,
        required:true
    },
    senderCity:{
        type:String,
        required:true
    },
    senderState:{
        type:String,
        required:true
    },
    senderPostalCode:{
        type:Number,
        required:true
    },
    senderMobilenumber:{
        type:Number,
        //required:true
    },
    senderemail:{
        type:String
    },
    senderItemCategory:{
        type:String,
        // required:true,
    },
    senderItemDescription:{
        type:String,
        // required:true,
    },

    receiverName:{
        type:String,
        required:true
    },
    receiverAddress:{
        type:String,
        required:true
    },
    receiverCity:{
        type:String,
        required:true
    },
    receiverState:{
        type:String,
        required:true
    },
    receiverPostalCode:{
        type:Number,
        required:true
    },
    receiverMobilenumber:{
        type:Number,
       // required:true
    },
    receiveremail:{
        type:String
    },
    receiverItemCategory:{
        type:String,
        // required:true,
    },
    receiverItemDescription:{
        type:String,
        // required:true,
    },
})

const CustomerModel = new mongoose.model("Customer" ,CustomerSchema )
module.exports = CustomerModel;