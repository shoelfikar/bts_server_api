const express = require('express');
const Router = express.Router()
const userController = require('../Controllers/user')
const auth = require('../middleware/auth')



Router
    .post('/signup', userController.signUp)
    .post('/signin', userController.signIn)
    .get('/',auth.verifyToken, userController.getAllUsers)





module.exports = Router