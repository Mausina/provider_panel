const { sequelize, Sequelize, log } = require("./init");

const customer = require("./customer");


const   Customer       = customer(sequelize, Sequelize);


module.exports = {
    Customer,
};