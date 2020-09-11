const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken : (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if( bearerHeader) {
      const token = bearerHeader.split(' ')[1]

      jwt.verify(token, process.env.SECRET_KEY, (err, data)=> {
        if(err) {
          return res.status(403).json({
            message: 'wrong token!'
          })
        }
        next()
      })
    } else{
      res.status(401).json({
        message: 'invailid authorozation!'
      })
    }
  }
}