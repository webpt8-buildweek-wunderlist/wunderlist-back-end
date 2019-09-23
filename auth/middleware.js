const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 'secret';

module.exports = {
  restricted,
  validateRegisterInputs,
  validateLoginCreds,
} 


function restricted(req, res, next) {
  const token = req.headers.authorization;

  // see if there is a token
  // check if it is valid =>
  //    rehash the header + payload + secret and see if it matches our verify signature

  if(token) {
    jwt.verify(token, jwtKey, (err, decodedToken) => {
      if(err) {
        console.log('failed verify', err);
        res.status(401).json({
          message: 'User not verified'
        })
      } else {
        // token is valid
        req.decodedToken = decodedToken;
        next();
      }
    })

  } else {
    res.status(400).json({
      message: 'No token provided, must be set on the Authorization Header'
    })
  }
};

function validateRegisterInputs(req, res, next) {
  let { username, password} = req.body;

  if(!username || !password ) {
    return res.status(412).json({message: 'One or more inputs missing... username, password'})
  }

  if(username && password) {
    req.user = {
      ...req.body,
    }
    next()
  }
}

function validateLoginCreds(req, res, next) {
  const { username, password } = req.body
    if (!username || !password) {
        res.status(405).json({message: "Missing an important input.. either the username or the password, please try again"})
    } else {
      next()
    }
}
