const express = require('express');
const cors = require('cors');
const app = express();
//const loginHandler = require('./routes/Auth.js');
require('./db/connect.js');
const bodyParser = require('body-parser');
const Auth = require('./routes/Auth.js');
const Orderhistory = require('./routes/Orderhistory.js');
const Customer = require('./routes/Customer.js');
const Delivery = require('./routes/Delivery.js');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for the production website
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// Load routes
app.use('/api/user', Auth);
app.use('/api/order', Orderhistory);
app.use('/api/post', Customer);
app.use('/api/update', Delivery);

// Assuming you have a route handler function defined in Auth.js

// Define the route handler for the /api/user/login endpoint
// app.post('/api/user/login', loginHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

