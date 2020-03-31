const Sequelize = require("sequelize");
let {config: {db,user_db,user_password,host,dialect}} = require("../config/serv.config");


const log4js = require("log4js");

log4js.configure({
    appenders: { cheese: { type: "file", filename: "error.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});

const log = log4js.getLogger("db");

const sequelize = new Sequelize(db, user_db, user_password, {
    host,
    dialect, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const {
    CustomerModel
} = require("./customer");

sequelize.sync({ force: false })
    .then(() => {
        console.log("Database & tables created!");
    }).catch(function (reason) {
    // отказ
    log.error("Error name: " + reason.name + " Address: " + reason.parent.address + " Port: " + reason.parent.port + " Syscall: " + reason.parent.syscall);
});

const   Customer       = CustomerModel(sequelize, Sequelize);

module.exports = {
    Customer,
};