const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/dbconfig')
const routes = require('./routes/insuranceRoutes')
const cors = require('cors');

const app = express();

app.use(cors());

//Test DB
db.authenticate()
.then(()=> console.log('DB Connected'))
.catch((err) => console.log('Error:', err))

app.use(bodyParser.json());

app.use((error, req, res, next) => {
    throw error
})

app.use('/api',routes)

module.exports = app;