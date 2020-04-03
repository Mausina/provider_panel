const {Router} = require('express');
const validator = require('../lib/validator');
const customer = require('../controllers/CustomerController');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'));

router.post('/customer/add', validator.validate_add, customer.create);
router.post('/customer/login', customer.authenticate);
router.post('/customer/token', customer.token);
router.get('/customers', validator.role_validate, customer.findAll);
router.post('/customer/:id', validator.auth_check, customer.findOne);
router.put('/customer/:user_id', validator.update_validate, customer.update);
router.delete('/customer/:user_id', validator.role_validate, customer.delete);


module.exports = router;