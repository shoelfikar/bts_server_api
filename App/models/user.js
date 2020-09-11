const db = require('../config/db');

const signUp =  (data)=> {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users SET ?', data, (err, result) => {
      if(!err) {
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })   
  })
}


const cekEmail = (email)=> {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
      if(!err){
        resolve(result)
      }else{
        reject(new Error(err))
      }
    })
  })
}


const getAllUsers = ()=> {
  return new Promise((resolve, reject)=> {
    db.query('SELECT * FROM users', (err, result)=> {
      if(!err) {
        resolve(result)
      }else {
        reject(new Error(err))
      }
    })
  })
}





module.exports = {
  signUp,
  cekEmail,
  getAllUsers
}