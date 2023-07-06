const express = require('express');
const CustomerModel = require('../models/Customer.js');
const nodemailer = require('nodemailer');
const moment = require('moment');
require('moment-timezone');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Replace with your email service provider (e.g., Gmail, Outlook)
  auth: {
    user: 'israr@hexabells.com',
    pass: 'prcalltvgzolfupj',
  },
});

const createPost = async (req, res) => {
  try {
    const {
      ItemName,
      ItemQuantity,
      ItemWeight,
      ItemType,
      OrderID,
      location,
      receiverAddress,
      receiverCity,
      receiverMobilenumber,
      receiverName,
      receiverPostalCode,
      receiverState,
      receiveremail,
      senderAddress,
      senderCity,
      senderMobilenumber,
      senderName,
      senderPostalCode,
      senderState,
      senderemail,
      status
    }= req.body;

    const istTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');



     const updates = []; // Initialize updates as an empty array


    const customer = new CustomerModel({
      OrderID,
      senderName,
      senderAddress,
      senderCity,
      senderState,
      senderPostalCode,
      senderMobilenumber,
      senderemail,
    
      receiverName,
      receiverAddress,
      receiverCity,
      receiverState,
      receiverPostalCode,
      receiverMobilenumber,
      receiveremail,
      ItemName,
      ItemQuantity,
      ItemWeight,
      ItemType,
      date: istTime,
      location,
      status,
      updates,
    });

    const newCustomer = await customer.save();

    const mailOptions = {
      from: `${senderemail}`,
      to: `${receiveremail}`,
      subject: 'Your order has been done successfully!',
      text: `Order tracking ID: ${newCustomer.OrderID}\nSender: ${senderName}\nReceiver: ${receiverName}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email notification' });
      } else {
        res.status(201).json({
          message: `${newCustomer.OrderID} your order has been done successfully`,
          customer: newCustomer,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCustomerHistory = async (req, res) => {
  try {
    const customers = await CustomerModel.find().populate('updates');
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const getOrder = async (req, res) => {
  const OrderID = req.params.OrderID;

  try {
    const order = await CustomerModel.findOne({ OrderID });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


const updateOrder = async (req, res) => {
  const { OrderID, status, location } = req.body;

  try {
    const order = await CustomerModel.findOne({ OrderID });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    order.location = location;
    order.date = new Date(); // Update the date to the current date and time
    // Create a new update object
    const update = {
      status,
      location,
      date: new Date(),
    };

    // Add the new update to the updates array
    order.updates.push(update);

    await order.save();

    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
const assign = async (req, res) => {
  const { orderIDs, username } = req.body;

  try {
    // Find the orders with the specified OrderIDs
    const orders = await CustomerModel.find({ OrderID: { $in: orderIDs } });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    // Assign the orders to the specified user
    orders.forEach((order) => {
      order.username = username;
      order.save();
    });

    res.status(200).json({ message: 'Orders assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { createPost, getCustomerHistory ,getOrder,updateOrder,assign};
