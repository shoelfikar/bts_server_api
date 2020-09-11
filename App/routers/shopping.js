const express = require('express');
const Router = express.Router()
const shopController = require('../Controllers/shopping')


Router
    .post('/', shopController.createShop)
    .get('/:id', shopController.getShopById)
    .get('/', shopController.getAllShopping)
    .put('/:id', shopController.updateShop)
    .delete('/:id', shopController.deleteShop)




module.exports = Router