'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/models/index.js');
const request = supertest(app);

beforeAll(async () => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('REST API', () => {
  test('handles invalid requests', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
  });
  test('Create a customer', async () => {
    let response = await request.post('/customer').send({
      name: 'tester',
      age: 42,
      pronouns: 'they/them',
    });
    let newCustomerTwo = await request.post('/customer').send({
      name: 'Raphael',
      age: 38,
      pronouns: 'he/him',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tester');
    expect(response.body.age).toEqual(42);
    expect(response.body.pronouns).toEqual('they/them');

    expect(newCustomerTwo.body.name).toEqual('Raphael');
    expect(newCustomerTwo.body.age).toEqual(38);
    expect(newCustomerTwo.body.pronouns).toEqual('he/him');
  });

  test('finds all customers', async () => {
    let response = await request.get('/customer');

    expect(response.status).toEqual(200);

    expect(response.body.length).toEqual(2);

    expect(response.body[0].name).toEqual('tester');
    expect(response.body[0].age).toEqual(42);
    expect(response.body[0].pronouns).toEqual('they/them');

    expect(response.body[1].name).toEqual('Raphael');
    expect(response.body[1].age).toEqual(38);
    expect(response.body[1].pronouns).toEqual('he/him');


  });

  test('finds a single customer', async () => {
    let response = await request.get('/customer/2');
    console.log(response.body);
    expect(response.body.name).toEqual('Raphael');
    expect(response.body.age).toEqual(38);
    expect(response.body.pronouns).toEqual('he/him');
  });

  // test('finds a customer by id', async () => {
  //   let response = await request.get('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  test('updates a single customer', async () => {
    await request.put('/customer/1').send({
      name: 'Mr. Tester',
      age: 42,
      pronouns: 'he/him',
    });

    let response = await request.get('/customer/1');

    expect(response.body.name).toEqual('Mr. Tester');
    expect(response.body.age).toEqual(42);
    expect(response.body.pronouns).toEqual('he/him');
  });

  // test('updates a customer by id', async () => {
  //   let response = await request.update('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  test('deletes a single customer', async () => {
    await request.delete('/customer/1');

    let response = await request.get('/customer');

    expect(response.body.length).toEqual(1);
    expect(response.body[0].name).toEqual('Raphael');
    expect(response.body[0].age).toEqual(38);
    expect(response.body[0].pronouns).toEqual('he/him');
  });




  // test('deletes a customer by id', async () => {
  //   let response = await request.destroy('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

//------------demo sample----------------
  test('Create a order', async () => {
    let response = await request.post('/order').send({
      productName: 'tester',
      amount: 2,
      shippingSpeed: 'Standard',
    });
    let newOrderTwo = await request.post('/order').send({
      productName: 'tester2',
      amount: 3,
      shippingSpeed: 'Standard',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tester');
    expect(response.body.age).toEqual(2);
    expect(response.body.pronouns).toEqual('standard');

    expect(newOrderTwo.body.name).toEqual('tester2');
    expect(newOrderTwo.body.age).toEqual(3);
    expect(newOrderTwo.body.pronouns).toEqual('Standard');
  });

  //------------------------------------------
  // test('Create an order', async () => {
  //   let response = await request.post('/order').send({
  //     productName: 'tester',
  //     amount: 1,
  //     shippingSpeed: 'Standard',
  //   });

  //   expect(response.status).toEqual(200);
  //   expect(response.body.productName).toEqual('tester');
  //   expect(response.body.amount).toEqual(1);
  //   expect(response.body.shippingSpeed).toEqual('Standard');
  // });



  test('finds all orders', async () => {
    let response = await request.get('/order');

    expect(response.status).toEqual(200);
    expect(response.body[0].productName).toEqual('tester');
    expect(response.body[0].amount).toEqual(1);
    expect(response.body[0].shippingSpeed).toEqual('Standard');
  });

  // test('finds a order by id', async () => {
  //   let response = await request.get('/order/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  // test('updates a order by id', async () => {
  //   let response = await request.update('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  // test('deletes a customer by id', async () => {
  //   let response = await request.destroy('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });



  test('Create a new person', async () => {
    let response = await request.post('/people').send({
      name: 'tester',
      age: 42,
      pronouns: 'they/them',
      // phone: 2065555555,
      // email: 'hello@world.com',
    });

    // expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('tester');
    expect(response.body.age).toEqual(42);
    expect(response.body.pronouns).toEqual('they/them');
    // expect(response.body.phone).toEqual(2065555555);
    // expect(response.body.email).toEqual('hello@world.com');
  });

  test('finds all people', async () => {
    let response = await request.get('/people');

    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('tester');
    expect(response.body[0].age).toEqual(42);
    expect(response.body[0].pronouns).toEqual('they/them');
    // expect(response.body[0].phone).toEqual(2065555555);
    // expect(response.body[0].email).toEqual('hello@world.com');
  });


  // test('finds people by id', async () => {
  //   let response = await request.get('/people/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  // test('updates people by id', async () => {
  //   let response = await request.update('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

  // test('deletes people by id', async () => {
  //   let response = await request.destroy('/customer/:id');

  //   expect(response.status).toEqual(200);
  //   expect(response.body[0].name).toEqual('tester');
  //   expect(response.body[0].age).toEqual(42);
  //   expect(response.body[0].pronouns).toEqual('they/them');
  // });

});
