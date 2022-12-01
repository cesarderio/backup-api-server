'use strict';

const { Next } = require('react-bootstrap/esm/PageItem');

class ModelInterface {
  constructor(model){
    this.model = model;
  }
  //create
  async create(json){
    // console.log('this is our json', json);
    try {
      // newCustomer = await CustomerModel.create(req.body);
      let record = await this.model.create(json);
      return record;
    } catch (e) {
      console.error('We have a ModelInterface create error', e);
      return e;
    }
  }

  //read
  async read(id = null){
    try {
      let record;
      if (id){
        // await CustomerModel.fineOne({where: { id } });
        record = await this.model.fineOne({where: {id}});
      }else {
        // await CustomerModel.findAll();
        record = await this.model.findAll();
      }
      return record;
    } catch (e) {
      console.error('we have a ModelInterface read error', e);
      return e;
    }
  }

  //---
  async readManyToOne(id, model){
    try {
      let record = await this.model.findOne({where: {id}, include: model});
      return record;
    } catch (e) {
      console.error('we have a ModelInterface readManyToOne error', e);
      return e;
    }
  }


  //update
  async update(json, id){
    try {
      // const result = await CustomerModel.update(req.body, {where: {id}});
      await this.model.update(json, {where: {id}});
      let record = await this.model.fineOne({where: {id}});
      return record;
    } catch (e) {
      console.error('we have a ModelInterface update error', e);
      return e;
    }
  }
  //delete



}
module.exports = ModelInterface;
