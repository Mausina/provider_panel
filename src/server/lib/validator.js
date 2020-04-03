let jwt = require("jsonwebtoken");
const Joi = require('joi');
const {config} = require('../config/serv.config');

const shema_add = Joi.object().keys({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    password:Joi.string().alphanum().min(4).max(40).required(),
    prefix:Joi.string().alphanum().min(2).max(4).required(),
    salt:Joi.string().alphanum().min(3).max(9),
    status:Joi.string().alphanum().min(1).max(1).required(),
    role:Joi.string().alphanum().min(5).max(8).required(),
    telephone: Joi.string().regex(/((\+)?\b(8|38)?(0[\d]{2}))([\d-]{5,8})([\d]{2})/).required(),
    email: Joi.string().email({minDomainAtoms: 2}).required()
});

const shema_update = Joi.object().keys({
    firstname: Joi.string().alphanum().min(3).max(30),
    lastname: Joi.string().alphanum().min(3).max(30),
    password:Joi.string().alphanum().min(4).max(40),
    prefix:Joi.string().alphanum().min(2).max(4),
    salt:Joi.string().alphanum().min(3).max(9),
    status:Joi.string().alphanum().min(1).max(1),
    role:Joi.string().alphanum().min(5).max(8),
    telephone: Joi.string().regex(/((\+)?\b(8|38)?(0[\d]{2}))([\d-]{5,8})([\d]{2})/),
    email: Joi.string().email({minDomainAtoms: 2})
});

function validate_add(req, res, next) {

    let check = key_check(req, res);
    if (check) {
        Joi.validate(req.body, shema_add, (err, value) => {
            if (err) {
                // send a 422 error response if validation fails
                res.status(422).json({
                    status: 'error',
                    message: err.details[0].message,
                    data: req.body
                });
            } else {
                next();
            }

        });
    }

}

function update_validate(req, res, next) {
    let check = key_check(req, res);
    if (check) {
        Joi.validate(req.body, shema_update, (err, value) => {
            if (err) {
                // send a 422 error response if validation fails
                res.status(422).json({
                    status: 'error',
                    message: err.details[0].message,
                    data: req.body
                });
            } else {
                next();
            }

        });
    }
}

function role_validate(req, res, next) {
    let user = key_check(req, res);
    if(user.role === 'admin'){
        next()
    }else{
        return res.status(401).json({message: 'Please be admin'});
    }
}

function auth_check(req, res, next) {
    key_check(req,res,next)
}
function key_check(req, res, next = '') {

    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(" ");
        // Set the token
        req.token = bearer[1];
        let result = '';
        // Next middleware
        jwt.verify(req.token, config.secret, (err, authData) => {
            if (err) {
                return res.status(422).json({
                    status: 'error',
                    message: 'Error in valid key authorized'
                });
            }

            if(next) next();

            result = authData;
        });

        return result
    } else {
        return res.status(401).json({message: 'Unauthorized'});
    }
}

module.exports = {
    validate_add,
    role_validate,
    auth_check,
    update_validate
};
