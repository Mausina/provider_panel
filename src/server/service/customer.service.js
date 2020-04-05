const {Customer} = require("../models/db");

// Create and Save a new Customer
let create_service = async (req) => {
    return Customer.create(req);
};

// Retrieve all Customers from the database.
let findAll_service = async () => {
    return Customer.findAll();
};

// Find a single Customer with a customerId
let findOne_service = async ({id}) => {
    return Customer.findOne({where: {id}});
};

// Update a Customer identified by the customerId in the request
let update_service = async (id, body) => {

    const [updated] = await Customer.updateById(body, id);

    if (updated) return Customer.getId(id);
};

// Delete a Customer with the specified customerId in the request
let delete_service = async ({user_id}) => {
    return Customer.deleteById(user_id);
};

let authenticate_service = async ({email, password}) => {
    return Customer.findByLogin(email, password);
};


module.exports = {
    authenticate_service,
    delete_service,
    update_service,
    findOne_service,
    findAll_service,
    create_service
};
