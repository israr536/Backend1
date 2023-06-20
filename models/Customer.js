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
        required:true,
    },
    senderPostalCode:{
        type:String,
        required:true,
    },
    senderMobilenumber:{
        type:String,
        required:true,
    },
    senderemail:{
        type:String,
        required:true,
    },
    // senderItemCategory:{
    //     type:String,
    //      required:true,
    // },
    // senderItemDescription:{
    //     type:String,
    //     required:true,
    // },

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
        required:true,
    },
    receiverPostalCode:{
        type:String,
        required:true,
    },
    receiverMobilenumber:{
        type:String,
        required:true,
    },
    receiveremail:{
        type:String,
        required:true,
    },
    ItemCategory:{
        type:String,
         required:true,
    },
    ItemDescription:{
        type:String,
        required:true,
    },
})

const CustomerModel = new mongoose.model("Customer" ,CustomerSchema )
module.exports = CustomerModel;