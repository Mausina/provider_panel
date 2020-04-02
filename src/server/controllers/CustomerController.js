const {Customer} = require("../models/db");

// Create and Save a new Customer
exports.create = async (req, res) => {
    try {
        const user = await Customer.create(req.body);
        return res.status(201).json({
            'msg': 'Success',
            user
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

// Retrieve all Customers from the database.
exports.findAll = async (req, res) => {
    try {
        const users = await Customer.findAll();
        return res.status(201).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

// Find a single Customer with a customerId
exports.findOne = async (req, res) => {
    try {
        const users = await Customer.findOne({where: {id: req.params.id}});
        if (!users) return res.status(404).json({'msg': 'Dont find user'});
        return res.status(201).json({
            'msg': 'Success',
            users,
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
};

// Update a Customer identified by the customerId in the request
exports.update = async (req, res) => {
    try {
        const {user_id} = req.params;
        const [updated] = await Customer.update(req.body, {
            where: {id: user_id}
        });
        if (updated) {
            const updatedUser = await Customer.findOne({where: {id: user_id}});
            return res.status(200).json({user: updatedUser});
        }
        throw new Error('User not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

// Delete a Customer with the specified customerId in the request
exports.delete = async (req, res) => {
    try {
        const { user_id } = req.params;
        const deleted = await Customer.destroy({
            where: { id: user_id }
        });
        if (deleted) {
            return res.status(201).json({'msg':'User deleted', user: user_id});
        }

        throw new Error("User deleted not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
