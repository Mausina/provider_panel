const {Customer} = require('../models/db');
const {CustomerNotFoundError} = require('../_helpers/CustomerNotFoundError');
const fun = require('../lib/function');
let jwt = require('jsonwebtoken');
const {config} = require('../config/serv.config');

// Create and Save a new Customer
let create = async (req, res) => {
    try {
        let create_user = await Customer.createUser(req.body);

        if (create_user) {
            res.json({'msg': 'Success', user: create_user})
        } else {
            res.status(400).json({msg: 'Username cant add'})
        }
    } catch (e) {
        throw new CustomerNotFoundError(req, res, 'Create is Error or dont pass validation')
    }
};

// Retrieve all Customers from the database.
let findAll = async (req, res) => {
    try {
        let users = await Customer.findAllUser();

        if (users) {
            res.json({'msg': 'Success', users})
        } else {
            res.status(400).json({msg: 'Users cant get answer admin'})
        }
    } catch (e) {
        throw new CustomerNotFoundError(req, res, 'FindAll is Error')
    }

};

// Find a single Customer with a customerId
let findOne = async (req, res) => {
    try {
        let find_user = await Customer.findFullInfo(req.params);
        console.log();
        if (find_user) {
            res.json({'msg': 'Success', user: find_user})
        } else {
            res.status(401).json({msg: 'Username cant Find'})
        }
    } catch (e) {
        throw new CustomerNotFoundError(req, res, 'FindOne is Error')
    }
};

// Update a Customer identified by the customerId in the request
let update = async (req, res) => {

    try {
        const {user_id} = req.params;

        let update_user = await Customer.updateById(req.body, user_id);

        if (update_user) {
            res.json({'msg': 'Success', user: update_user})
        } else {
            res.status(400).json({message: 'Username cant Update'})
        }
    } catch (e) {
        throw new CustomerNotFoundError(req, res, 'Update is Error')
    }


};

// Delete a Customer with the specified customerId in the request
let delete_user = async (req, res) => {
    try {
        let delete_user = await Customer.deleteById(req.params);

        if (delete_user) {
            res.json({'msg': 'Success', user: delete_user})
        } else {
            res.status(400).json({msg: 'Username cant Delete'})
        }
    } catch (e) {
        throw new CustomerNotFoundError(req, res, 'Delete_user is Error')
    }
};

let authenticate = async (req, res) => {
    try {
        let user = await Customer.findByLogin(req.body);

        if (user) {
            res.status(200).json(fun.token_controller(user));
        } else {
            res.status(401).json({msg: 'User cant find check fields'})
        }
    } catch (e) {
        throw new CustomerNotFoundError(req, res, 'Authenticate is Error')
    }

};

let token = (req, res) => {
    jwt.verify(req.body.token, config.refresh_secret, (err, user) => {
        if (err) throw new CustomerNotFoundError(req, res, 'Refresh token incorrect', 403);
        let accessToken = fun.generateAccessToken({user}, config.secret, '60s');
        res.status(200).json({'msg': 'Success', accessToken})
    },);
};


module.exports = {
    token,
    authenticate,
    delete_user,
    update,
    findOne,
    findAll,
    create
};
