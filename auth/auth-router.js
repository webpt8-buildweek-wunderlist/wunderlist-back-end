const router = require('express').Router();
const {validateRegisterInputs, validateLoginCreds} = require('../auth/middleware.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/user-model.js');


router.post('/register', validateRegisterInputs, (req, res) => {
  console.log(process.env.DATABASE_URL)
  console.log(process.env)
  // let user = req.body;
  // const hash = bcrypt.hashSync(user.password, 10);
  // user.password = hash;

  // Users.addUser(user)
  //   .then(saved => {
  //       const token = generateToken(saved)
  //       res.status(201).json({
  //           user: saved,
  //           token
  //       });
  //   })
  //   .catch(err => {
  //       console.log(err)
  //       res.status(500).json(err.code);
  //   });
});

router.post('/login', validateLoginCreds, (req, res) => {
  let { username, password } = req.body;

  Users.findUserBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                message: `Welcome ${user.username}!`,
                user: user,
                token
            });
      } else {
            res.status(401).json({ message: 'User credentials invalid, please register...' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error logging in User'
      });
    });
});

function generateToken(user) {

  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
