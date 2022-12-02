'use strict';

module.exports = (sequelizeDatabase, DataTypes) => sequelizeDatabase.define('people', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pronouns: {
    type: DataTypes.ENUM,
    values: ['they/them', 'she/her', 'he/him'],
    allowNull: true,
  },
  // phone: {
  //   type: DataTypes.INTEGER || DataTypes.STRING,
  //   allowNull: false,
  // },
  // email: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
});
