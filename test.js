const crypto = require('crypto');
const { validatePassword } = require('./util/PasswordValidator');
const jwt = require('jsonwebtoken')

const arr = ['1', 2, 3, 4, 6, 7, 8];
console.log(arr.includes(2));