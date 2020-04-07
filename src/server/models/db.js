const { sequelize, Sequelize} = require("./init");

const { CustomerModel} = require("./customer");



const models = {
    Customer: CustomerModel.init(sequelize, Sequelize)
};


// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

module.exports = {
    ...models,
};