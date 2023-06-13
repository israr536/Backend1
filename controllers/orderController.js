const mongoose = require('mongoose');
const OrderModel = require('../models/OrderHistory.js');

const createOrder = async (req, res) => {
  const date = new Date();
  const options = { timeZone: 'Asia/Kolkata' };

  try {
    const { orderID, status, time, location ,mobilenumber,address,pincode} = req.body;
    const orderData = {
      orderID,
      status,
      date: date.toLocaleString('en-IN', options), // Convert date to Indian Standard Date and Time
      time,
      location,
      mobilenumber,
      address,
      pincode,
    };
    

    const order = new OrderModel(orderData);
    const savedOrder = await order.save();

    res.status(201).json({ status: 201, message: 'Order created', order: savedOrder });
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Failed to create order', error: error.message });
  }
};

// Endpoint to handle fetching order history
const History = async (req, res) => {
  try {
    const orderHistory = await OrderModel.find().sort({ date: -1 });
    console.log(orderHistory);

    res.status(200).json({ orderHistory });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrder = async (req, res) => {
  const orderID = req.params.orderID;

  try {
    const order = await OrderModel.findOne({ orderID });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createOrder, getOrder,History };

