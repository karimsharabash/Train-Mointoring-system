const jwt = require('jsonwebtoken')

/*********************verfiyy token in any request************/

function verfiyToken(req, res, next) {
  let token = req.headers.authorization
  if (token) {
    jwt.verify(token, 'secret', function (err, tokenData) {
      if (err) {
        res.send("auauthorized access")
      }
      else if (tokenData) {
        if (tokenData.exp < (new Date().getTime() / 1000))
          res.send("token expiered")
        next();
      }
    })
  }
  else {
    res.send("auauthorized access")
  }
}


/*************************************************************/

module.exports = verfiyToken;