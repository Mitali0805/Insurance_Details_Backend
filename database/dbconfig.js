const { Sequelize } = require('sequelize');

module.exports = new Sequelize('BCG_Insurance', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
  });

