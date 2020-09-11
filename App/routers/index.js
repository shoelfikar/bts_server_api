const express = require('express')
const Router = express.Router()
const user = require('./user')
const shopping = require('./shopping')


Router
  .use('/users', user)
  .use('/shopping', shopping)
  .get('/', (req, res)=> {
    res.json({
      message: 'Hello from REST API',
      author: 'sulfikardi'
    })
  })


module.exports = Router