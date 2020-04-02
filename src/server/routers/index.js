const { Router } = require('express');
const customer = require('../controllers/CustomerController');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'));

router.post('/customer/add', customer.create);
router.get('/customers', customer.findAll);
router.get('/customer/:id', customer.findOne);
router.put('/customer/:user_id', customer.update);
router.delete('/customer/:user_id', customer.delete);


module.exports = router;