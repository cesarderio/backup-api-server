'use strict';

const express = require('express');

// const { OrderModel } = require('../models/index');
const { orderInterface } = require('../models');

const router = express.Router();


router.get('/order', async (req, res, next) => {
  // const users = await User.findAll();
  try {
    const orders = await orderInterface.read();
    // const orders = await OrderModel.findAll();
    res.status(200).send(orders);
  } catch (e) {
    next(e);
  }
});

//---------
router.get('/customer/:id', async (req, res, next) => {
  // const { id } = req.params;
  const id = req.params.id;

  const singleCustomer = await customerInterface.read(id);
  // const singleCustomer = await CustomerModel.findOne({where: {id}});
  res.status(200).send(singleCustomer);
});
//---------

router.get('/order/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderById = await orderInterface.read(id);
    // const orderById = await OrderModel.findAll({where:{id}});
    res.status(200).send(orderById);
  } catch(e) {
    next(e);
  }
});

router.post('/order', async (req, res, next) => {
  try {
    // const newOrder = await orderInterface.create(req.body);
    const newOrder = await OrderModel.create(req.body);
    res.status(200).send(newOrder);

  } catch (e) {
    next(e);
  }
});

router.put('/order/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedOrder = await OrderModel.update(req.body, { where: {id}} );
    res.status(200).send(updatedOrder);
  } catch(e) {
    next(e);
  }
});

router.delete('/order/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderById = await OrderModel.destroy({where:{id}});
    res.status(200).send(orderById);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
