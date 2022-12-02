'use strict';

module.exports = (sequelizeDatabase, DataTypes) => sequelizeDatabase.define('orders', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shippingSpeed: {
    type: DataTypes.ENUM,
    values: ['Standard', 'Expedited', 'Next Day'],
    allowNull: false,
  },
});
