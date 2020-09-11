const userModel = require('../models/user');
const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = genSaltSync(10);




const signUp = (req, res)=> {
  const {
    username,
    password,
    email,
    phone,
    country,
    city,
    postcode,
    name,
    address
  } = req.body
  const data = {
    username,
    password: hashSync(password, salt),
    email,
    phone,
    country,
    city,
    postcode,
    name,
    address
  }
  userModel.cekEmail(data.email)
    .then(result => {
        if(result.length === 1) {
          return res.status(403).json({
              message: 'Email already taken!',
              status: 'failed',
              status_code: 403
            })
        }
        userModel.signUp(data)
          .then((newResult)=> {
            const token = jwt.sign({ user_id: newResult.insertId, username: data.username, email: data.email, phone: data.phone, country: data.country, city: data.city, postcode: data.postcode, name: data.name }, process.env.SECRET_KEY)
            res.status(200).json({
              email: data.email,
              token: token,
              username: data.username
            })
            
          })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({
        message: 'Server Error',
        status: 'failed'
      })
    })
}




const signIn = (req, res)=> {
  const {
    email,
    password
  } = req.body
  const data = {
    email,
    password
  }
  userModel.cekEmail(data.email)
  .then((result)=> {
    const cekPassword = compareSync(data.password, result[0].password)
    if(cekPassword){
      const token = jwt.sign({ user_id: result[0].id, username: result[0].username, email: result[0].email, phone: result[0].phone, country: result[0].country, city: result[0].city, postcode: result[0].postcode, name: result[0].name }, process.env.SECRET_KEY)
      res.status(200).json({
        email: result[0].email,
        token: token,
        username: result[0].username
      })
      
    }else{
      res.status(203).json({
        message: 'Incorrent Password!',
        status: 'failed'
      })
      
    }
  })
  .catch(()=> {
    res.status(404).json({
      message: 'Email not found, Please register!',
      status: 'failed',
      status_code: 404
    })
  })
}



const getAllUsers = (req, res)=> {
  userModel.getAllUsers()
    .then(result => {
      res.status(200).json({
        message: 'All Users',
        users: result,
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


module.exports = {
  signUp,
  signIn,
  getAllUsers
}