let express = require('express');
let router = express.Router();

const fun = require('../../lib/function');
let {sendMessage} = require('../../controllers/UsersController');

router.post('/',fun.verifyToken,sendMessage);

module.exports = router;