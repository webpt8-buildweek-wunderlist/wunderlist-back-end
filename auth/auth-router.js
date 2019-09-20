const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/user-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.addUser(user)
    .then(saved => {
        // A JWT should be generated
        const token = generateToken(saved)
        res.status(201).json({
            user: saved,
            token
        });
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findUserBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          // A JWT should be generated
            const token = generateToken(user);
            res.status(200).json({
                message: `Welcome ${user.username}!`,
                token
            });
      } else {
            res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  // header payload and verify signature
  // payload -> username, id, roles, exp date
  // verify signature -> a secret

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
