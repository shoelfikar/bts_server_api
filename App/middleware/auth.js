const jwt = require('jsonwebtoken')

module.exports = {
  verifyToken : (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    try {
      if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, process.env.SECRET_KEY, (err,decoded)=> {
          if(decoded){
            console.log('success')
            next()
          }else{
            res.status(403).send({
              message: 'token expired'
            })
          }
        })
      } 
    } catch(error) {
      return res.status(401).send({
        message: 'invailid authorozation!'
      })
    }
  }
}