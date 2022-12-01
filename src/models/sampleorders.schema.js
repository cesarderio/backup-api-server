'use strict';

module.exports = (sequelizeDatabase, DataTypes) => sequelizeDatabase.define('customers', {
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
