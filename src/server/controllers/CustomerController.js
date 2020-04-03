const customerService = require('../service/customer.service');
const {Customer} = require("../models/db");
let jwt = require("jsonwebtoken");

// Create and Save a new Customer
exports.create = async (req, res) => {
    customerService.create(req.body)
        .then(user => user ? res.json({
            'msg': 'Success',
            user
        }) : res.status(400).json({message: 'Username cant add'}))
        .catch(err => res.status(400).json({message: err.errors[0].message}));
};

// Retrieve all Customers from the database.
exports.findAll = async (req, res) => {
    customerService.findAll().then(users => users ? res.json({
        'msg': 'Success',
        users
    }) : res.status(400).json({message: 'Users cant get answer admin'}))
        .catch(err => res.status(400).json({message: err}));
};

// Find a single Customer with a customerId
exports.findOne = async (req, res) => {
    customerService.findOne(req.params).then(user => user ? res.json({
        'msg': 'Success',
        user
    }) : res.status(400).json({message: 'Username cant Find'}))
        .catch(err => res.status(400).json({message: err}));
};

// Update a Customer identified by the customerId in the request
exports.update = async (req, res) => {
    customerService.update(req) .then(user => user ? res.json({
        'msg': 'Success',
        user
    }) : res.status(400).json({message: 'Username cant Update'}))
        .catch(err => res.status(400).json({message: err}));
};

// Delete a Customer with the specified customerId in the request
exports.delete = async (req, res) => {
    customerService.delete(req.params).then(user => user ? res.json({
        'msg': 'Success',
        user
    }) : res.status(400).json({message: 'Username cant Delete'}))
        .catch(err => res.status(400).json({message: err}));
};

exports.authenticate = async (req, res) => {
    customerService.authenticate(req.body).then(token => token ? res.json({
        'msg': 'Success',
        token
    }) : res.status(400).json({message: 'User cant find check fields'}))
        .catch(err => res.status(400).json({message: err}));
};

exports.token = (req, res) => {
    let result = customerService.token(req.body);
    console.log(result)
    let {accessToken,code} = result;

    if (accessToken && code !== 403) {
        res.status(code).json({ 'msg': 'Success',accessToken})
    }else {
        res.status(code).json({message: 'Refresh token incorrect'});
    }

};

