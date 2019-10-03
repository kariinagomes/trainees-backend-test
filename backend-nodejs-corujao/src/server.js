const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const database = require('./database');

const server = express();

database.connection();

server.use(express.json());

server.use(routes);

server.listen(5000);