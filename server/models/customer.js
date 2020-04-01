'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    telephone: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    prefix: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};