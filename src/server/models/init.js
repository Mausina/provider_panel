module.exports.initDb=(config)=>{
    const Sequelize = require("sequelize");
    const log4js = require("log4js");
    log4js.configure({
        appenders: {cheese: {type: "file", filename: "error.log"}},
        categories: {default: {appenders: ["cheese"], level: "error"}}
    });

    const log = log4js.getLogger("db");
    const {host,dialect} = config;

    const sequelize = new Sequelize(config.db, config.user_db, config.user_password, {
        host,
        dialect, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    return  {
        sequelize,
        Sequelize
    };
};
