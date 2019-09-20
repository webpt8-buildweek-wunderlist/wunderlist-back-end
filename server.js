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

module.exports = server;