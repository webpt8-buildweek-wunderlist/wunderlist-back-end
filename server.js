const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const AuthRouter = require('./auth/auth-router.js');
const UserRouter = require('./users/user-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', AuthRouter)
server.use('/api/users', UserRouter);

server.get('/', (req, res) => {
    res.status(200).send(`
      <div>
        <h2>Server Running Live...</h2>
        <p>Url to Login endpoint <strong>'/api/login'</strong></p>
        <p>Url to Register endpoint <strong>'/api/register'</strong></p>
      </div>`);
  });

module.exports = server;