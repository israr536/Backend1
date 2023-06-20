const express = require('express');
const CustomerModel = require('../models/Customer');
const nodemailer = require('nodemailer');

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
      senderName,
      senderAddress,
      senderCity,
      senderState,
      senderPostalCode,
      senderMobilenumber,
      senderemail,
      // senderItemCategory,
      // senderItemDescription,
      receiverName,
      receiverAddress,
      receiverCity,
      receiverState,
      receiverPostalCode,
      receiverMobilenumber,
      receiveremail,
      ItemCategory,
      ItemDescription,
    } = req.body;

    const customer = new CustomerModel({
      senderName,
      senderAddress,
      senderCity,
      senderState,
      senderPostalCode,
      senderMobilenumber,
      senderemail,
      // senderItemCategory,
      // senderItemDescription,
      receiverName,
      receiverAddress,
      receiverCity,
      receiverState,
      receiverPostalCode,
      receiverMobilenumber,
      receiveremail,
      ItemCategory,
      ItemDescription,
    });

    const newCustomer = await customer.save();

    const mailOptions = {
      from: `${senderemail}`,
      to: `${receiveremail}`,
      subject: 'Your order has been done successfully!',
      text: `Order tracking ID: ${newCustomer._id}\nSender: ${senderName}\nReceiver: ${receiverName}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email notification' });
      } else {
        res.status(201).json({
          message: `${newCustomer._id} your order has been done successfully`,
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
    const customers = await CustomerModel.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createPost, getCustomerHistory };
