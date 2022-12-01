'use strict';

const express = require('express');

const { CustomerModel } = require('../models/index');
const { customerInterface, orderInterface} = require('../models');

const router = express.Router();


router.get('/customer', async (req, res, next) => {
  // const users = await User.findAll();
  try {
    const customers = await customerInterface.read();
    // const customers = await CustomerModel.findAll();
    res.status(200).send(customers);
  } catch(e) {
    next(e);
  }
});
//-----------------------------------------
router.get('/customer/:id', async (req, res, next) => {
  // const { id } = req.params;
  const id = req.params.id;

  const singleCustomer = await customerInterface.read(id);
  // const singleCustomer = await CustomerModel.findOne({where: {id}});
  res.status(200).send(singleCustomer);
});

// router.get('/customer/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const customerById = await CustomerModel.findAll({where:{id}});
//     res.status(200).send(customerById);
//   } catch(e) {
//     next(e);
//   }
// });
//----------------------------------------------------------
router.get('/customerWithOrders/:id', async (req, res, next) => {
  const customerWithOrders = await customerInterface.readManyToOne(req.params.id, orderInterface.model);
  res.status(200).send(customerWithOrders);
});
//--------------
router.post('/customer', async (req, res, next) => {
  try {
    const newCustomer = await customerInterface.create(req.body);
    res.status(200).send(newCustomer);
  } catch(e) {
    next(e);
  }
});

//-------demo--------
router.put('/customer/:id', async (req, res, next) => {
  try {
    // const updatedCustomer = await customerInterface.update(req.body, req,params.id);
    const result = await CustomerModel.update(req.body, {where: {id: req.params.id}});
    // if I want to return modified data, do a get ONE here and send it to client
    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
});

// router.put('/customer/:id', async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const updatedCustomer = await CustomerModel.update(req.body, { where: {id}} );
//     res.status(200).send(updatedCustomer);
//   } catch(e) {
//     next(e);
//   }
// });


// router.delete('/customer/:id', async (req, res, next) => {
//   try {
//     const result = await CustomerModel.destroy(req.body, {where: {id: req.params.id}});
//     res.status(200).send(result);
//   } catch (e) {
//     next(e);
//   }
// });


router.delete('/customer/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const customerById = await CustomerModel.destroy({where:{id}});
    res.status(200).send(customerById);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
