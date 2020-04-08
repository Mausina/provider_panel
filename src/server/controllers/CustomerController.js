const {Customer} = require('../models/db');
const {CustomerNotFoundError} = require('../_helpers/CustomerNotFoundError');
const fun = require('../lib/function');
let jwt = require('jsonwebtoken');
const {config} = require('../config/serv.config');

// Create and Save a new Customer
let create = async (req, res) => {
    try {
        Customer.createUser(req.body)
            .then(user => user ? res.json({
                'msg': 'Success',
                user
            }) : res.status(400).json({message: 'Username cant add'}))
    }catch (e) {
        throw new CustomerNotFoundError(req, res, 'Create is Error or dont pass validation')
    }
};

// Retrieve all Customers from the database.
let findAll = async (req, res) => {
    try {
        Customer.findAllUser().then(users => users ? res.json({
            'msg': 'Success',
            users
        }) : res.status(400).json({message: 'Users cant get answer admin'}))
    }catch (e) {
        throw new CustomerNotFoundError(req, res, 'FindAll is Error')
    }

};

// Find a single Customer with a customerId
let findOne = async (req, res) => {
    try {
        Customer.findFullInfo(req.params)
            .then(user => user ? res.json({
                'msg': 'Success',
                user
            }) : res.status(401).json({msg: 'Username cant Find'}))
    }catch (e) {
        throw new CustomerNotFoundError(req, res, 'FindOne is Error')
    }
};

// Update a Customer identified by the customerId in the request
let update = async (req, res) => {

    try {
        const {user_id} = req.params;
        Customer.updateById(req.body,user_id)
            .then(user => user ? res.json({
                'msg': 'Success',
                user
            }) : res.status(400).json({message: 'Username cant Update'}))
    }catch (e) {
        throw new CustomerNotFoundError(req, res, 'Update is Error')
    }


};

// Delete a Customer with the specified customerId in the request
let delete_user = async (req, res) => {
    try{
        Customer.deleteById(req.params).then(user => user ? res.json({
            'msg': 'Success',
            user
        }) : res.status(400).json({message: 'Username cant Delete'}))
    }catch (e) {
        throw new CustomerNotFoundError(req, res, 'Delete_user is Error')
    }
};

let authenticate = async (req, res) => {
    try{
        Customer.findByLogin(req.body)
            .then(user => user ? res.status(200).json(fun.token_controller(user)) : res.status(401).json({msg: 'User cant find check fields'}));
    }catch (e) {
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