const OrderModel = require('../models/OrderHistory');

// Endpoint to handle updating order status
const Update = async (req, res) => {
  const { orderID, status,  location } = req.body;
  const date = new Date();
  try {
    const order = await OrderModel.findOneAndUpdate(
      { orderID },
      { $set: { status, date,  location } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Endpoint to handle fetching order history
const History = async (req, res) => {
  try {
    const orderHistory = await OrderModel.find();

    res.status(200).json({ orderHistory });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { Update, History };



// app.post('/api/orders/submit', (req, res) => {
//   const { userId,status, date, location, time } = req.body;
//   const newOrder = {
//     id: Date.now(),
//     userId,
//     status,
//     date,
//     location,
//     time,
//   };
//   orders.push(newOrder);
//   res.status(200).json({ message: 'Order submitted successfully' });
// });




