const shopModels = require('../models/shopping');


const createShop = (req, res)=> {
  const {
    name,
    created_date
  } = req.body
  const data = {
    name,
    created_date
  }
  shopModels.createShop(data)
    .then(result => {
      newData = {
        created_date: data.created_date,
        name: data.name,
        id: result.insertId
      }
      res.status(200).json({
        data:newData
      })
    })
    .catch(()=> {
      res.status(500).json({
        message: 'Server Error!',
        status: 'failed'
      })
    })
}




const getAllShopping = (req, res)=> {
  shopModels.getAllShopping()
    .then(result => {
      res.status(200).json({
        message: 'All Shopping',
        data: result,
        status: 'success',
        status_code: 200
      })
    })
    .catch(()=> {
      res.status(500).json({
        message: 'Server Error',
        status: 'failed',
        status_code: 500
      })
    })
}




const getShopById = (req, res)=> {
  const id = req.params.id
  shopModels.getShopById(id)
    .then(result => {
      if(result.length === 0) {
        return res.status(500).json({
          message: 'Data not found',
          status: 'failed',
          status_code: 404
        })
      }
      res.status(200).json({
        message: `Data Shopping dengan Id ${id}`,
        data: result,
        status: 'success',
        status_code: 200
      })
    })
    .catch(()=> {
      res.status(500).json({
        message: 'Server Error',
        status: 'failed',
        status_code: 500
      })
    })
}




const updateShop = (req, res)=> {
  const id = req.params.id
  const {
    name,
    created_date
  } = req.body
  const data = {
    name,
    created_date
  }
  shopModels.updateSHop(data, id)
    .then(()=> {
      res.status(200).json({
        message: 'Update Successfully',
        status_code: 200
      })
    })
    .catch(()=> {
      req.status(404).json({
        message: 'data not found!',
        status_code: 404,
        status: 'failed'
      })
    })
}





const deleteShop = (req, res)=> {
  const id = req.params.id
  shopModels.deleteShop(id)
    .then(()=> {
      res.status(200).json({
        message: 'Data Deleted!',
        status: 'success'
      })
    })
    .catch(()=> {
      res.status(404).json({
        message: 'data not found',
        status: 'failed'
      })
    })
}



module.exports = {
  createShop,
  getAllShopping,
  getShopById,
  updateShop,
  deleteShop
}