const {Customer} = require("../models/db");
const {Op, fn, col} = require("sequelize");
const {config} = require('../config/serv.config');
const fun = require('../lib/function');
let jwt = require("jsonwebtoken");

// Create and Save a new Customer
exports.create = async (req) => {
    return Customer.create(req);
};

// Retrieve all Customers from the database.
exports.findAll = async () => {
    return Customer.findAll();
};

// Find a single Customer with a customerId
exports.findOne = async ({id}) => {
    return Customer.findOne({where: {id}});
};

// Update a Customer identified by the customerId in the request
exports.update = async (req) => {
    const {user_id} = req.params;
    const [updated] = await Customer.update(req.body, {
        where: {id: user_id}
    });
    if (updated) {
        return Customer.findOne({where: {id: user_id}});
    }
};

// Delete a Customer with the specified customerId in the request
exports.delete = async ({user_id}) => {
    return await Customer.destroy({
        where: {id: user_id}
    });
};

exports.authenticate = async ({email, password}) => {

    const user = await Customer.findOne({
        where: {
            [Op.and]: [
                {email: email},
                {password: password},
                {status: true}
            ]
        }
    });
    if (user) {

        let now = new Date();
        const accessToken = fun.generateAccessToken({
            sub: user.dataValues.id,
            role: user.dataValues.role
        }, config.secret, "60s");

        const refreshToken = fun.generateAccessToken({
            sub: user.dataValues.id,
            role: user.dataValues.role
        }, config.refresh_secret, "7d");

        return {
            access: {token:accessToken, expiredIn: now.setTime(now.getTime() + 60 * 1000)},
            refresh: {token:refreshToken, expiredIn: now.setTime(now.getTime() + (7 * 24 * 60 * 60 * 1000))}
        };

    }
};

exports.token = ({token}) => {
    let accessToken = '';
    let code = 200;

    jwt.verify(token, config.refresh_secret, (err, user) => {
        if (err) code = 403;
        accessToken = fun.generateAccessToken({user},config.secret,'60s');
    },);

    return {
        accessToken,
        code
    }
};
