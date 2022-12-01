'use strict';

const express = require('express');

const { PeopleModel } = require('../models/index');

const router = express.Router();


router.get('/people', async (req, res, next) => {
  // const users = await User.findAll();
  try {
    const people = await PeopleModel.findAll();
    res.status(200).send(people);
  } catch (e) {
    next(e);
  }
});

router.get('/people/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const personById = await PeopleModel.findAll({where:{id}});
    res.status(200).send(personById);
  } catch(e) {
    next(e);
  }
});

router.post('/people', async (req, res, next) => {
  try {
    const newPerson = await PeopleModel.create(req.body);
    res.status(200).send(newPerson);

  } catch (e) {
    next(e);
  }
});


router.put('/people/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedPerson = await PeopleModel.update(req.body, { where: {id}} );
    res.status(200).send(updatedPerson);
  } catch(e) {
    next(e);
  }
});


router.delete('/people/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const personById = await PeopleModel.destroy({where:{id}});
    res.status(200).send(personById);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
