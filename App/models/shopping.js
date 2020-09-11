const db = require('../config/db');

const createShop = (data)=> {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO shopping SET ?', data, (err, result) => {
      if(!err) {
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })   
  })
}



const getAllShopping = ()=> {
  return new Promise((resolve, reject)=> {
    db.query('SELECT * FROM shopping', (err, result)=> {
      if(!err) {
        resolve(result)
      }else {
        reject(new Error(err))
      }
    })
  })
}




const getShopById = (id)=> {
  return new Promise((resolve, reject)=> {
    db.query('SELECT * FROM shopping WHERE id = ?',id, (err, result)=> {
      if(!err) {
        resolve(result)
      }else {
        reject(new Error(err))
      }
    })
  })
}



const updateSHop = (data, id)=> {
  return new Promise((resolve, reject)=> {
    db.query('UPDATE shopping SET ? WHERE id= ?',[data, id], (err, result)=> {
      if(!err) {
        resolve(result)
      }else {
        reject(new Error(err))
      }
    })
  })
}



const deleteShop = (id)=> {
  return new Promise((resolve, reject)=> {
    db.query('DELETE FROM shopping WHERE id = ?',id, (err, result)=> {
      if(!err) {
        resolve(result)
      }else {
        reject(new Error(err))
      }
    })
  })
}



module.exports = {
  createShop,
  getAllShopping,
  getShopById,
  updateSHop,
  deleteShop
}