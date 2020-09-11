const express = require('express');
const Router = express.Router()
const shopController = require('../Controllers/shopping')
const auth = require('../middleware/auth')


Router
    .post('/',auth.verifyToken, shopController.createShop)
    .get('/:id',auth.verifyToken, shopController.getShopById)
    .get('/',auth.verifyToken, shopController.getAllShopping)
    .put('/:id',auth.verifyToken, shopController.updateShop)
    .delete('/:id',auth.verifyToken, shopController.deleteShop)




module.exports = Router