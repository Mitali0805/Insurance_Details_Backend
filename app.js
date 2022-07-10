const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/dbconfig')
const routes = require('./routes/insuranceRoutes')

const app = express();

//Test DB
db.authenticate()
.then(()=> console.log('DB Connected'))
.catch((err) => console.log('Error:', err))

app.use(bodyParser.json());

app.use('/api',routes)

module.exports = app;