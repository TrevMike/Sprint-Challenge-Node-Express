const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')

const port = 9000;

const actionRoutes = require('./Actions/actionRoutes');
const projectRoutes = require('./Projects/projectRoutes');

const server = express();
server.use(express.json(), cors(), helmet(), morgan('combined'));

server.use('/api/actions', actionRoutes);
server.use('/api/project', projectRoutes);

server.listen(port, () => 
    console.log(`\n=== API running on port ${port} ===\n`)
);