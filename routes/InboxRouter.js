const { Router } = require('express');
const { getMessages, sendMessage } = require('../controllers/InboxController');
const { verifyJWTMiddleware } = require('../util/JSONWebToken');

const router = Router()

router.get('/', verifyJWTMiddleware, getMessages);

router.post('/', verifyJWTMiddleware, sendMessage)

module.exports.inboxRouter = router;