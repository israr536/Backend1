const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment-timezone');


// const options = { timeZone: 'Asia/Kolkata' };


CustomerSchema = new mongoose.Schema({
    OrderID:{
        type:String,
        required:true,
    },
    senderName:{
        type:String,
        required:true,
    },
    senderAddress:{
        type:String,
        required:true,
    },
    senderCity:{
        type:String,
        required:true,
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

    receiverName:{
        type:String,
        required:true,
    },
    receiverAddress:{
        type:String,
        required:true,
    },
    receiverCity:{
        type:String,
        required:true,
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
    ItemName:{
        type:String,
        required:true,
    },
    ItemQuantity:{
        type:String,
         required:true,
    },
    ItemWeight:{
        type:String,
        required:true,
    },
    ItemType:{
type:String,
required:true,
    },
    date: {
        type: Date,
        required: true,
        default: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      },
      
      
      location:{
        type:String,
        // required:true,
      },
      status:{
        type:String,
         required:true,

    },
    updates: [
        {
          status: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            required: true,
            default: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          },
          
          
          location: {
            type: String,
          },
          // Other updated fields...
        }
      ]
});

const CustomerModel = new mongoose.model("Customer" ,CustomerSchema )
module.exports = CustomerModel;