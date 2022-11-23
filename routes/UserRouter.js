const express = require('express')
const { login, register, validate, getUsers } = require('../controllers/UserController');
const { verifyJWTMiddleware } = require('../util/JSONWebToken');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to users route')
})

router.post('/login', login);

router.post('/register', register);

router.get('/validate', verifyJWTMiddleware, validate);

router.get('/get', verifyJWTMiddleware, getUsers)

module.exports.userRouter = router;