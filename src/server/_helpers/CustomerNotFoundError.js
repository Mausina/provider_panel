const log4js = require("log4js");

log4js.configure({
    appenders: { cheese: { type: "file", filename: "error.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});

const log = log4js.getLogger("Customer");

class CustomerNotFoundError extends Error {
    constructor(req, res, message, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.status = status || 400;
        this.message = message || 'Something went wrong';

        log.error(message);

        return res.status(this.status).json({ message });


    }
}
module.exports = {
    CustomerNotFoundError
};