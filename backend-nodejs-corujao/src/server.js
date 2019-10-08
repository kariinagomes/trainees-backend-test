const express = require('express');
const routes = require('./routes');
const database = require('./database/database');

const server = express();

database.connection();

server.use(express.json());

server.use(routes);

server.listen(5000);