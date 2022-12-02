'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const PORT = process.env.PORT || 3002;
const customerRouter = require('./routes/customers');
const peopleRouter = require('./routes/people');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());
app.use(customerRouter);
app.use(ordersRouter);
app.use(peopleRouter);
// app.use('/routes/customers', customerRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World');
});

app.use('*', notFound);
app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log('listening on port', PORT));
}
module.exports = { app, start };

// app.get('/customer', async (req, res, next) => {
// // const users = await User.findAll();
//   try {
//     const customers = await CustomerModel.findAll();
//     res.status(200).send(customers);
//   } catch (e) {
//     next(e);
//   }
// });

// app.post('/customer', async (req, res, next) => {
//   try {
//     const newCustomer = await CustomerModel.create(req.body);
//     res.status(200).send(newCustomer);

//   } catch (e) {
//     next(e);
//   }
// });



