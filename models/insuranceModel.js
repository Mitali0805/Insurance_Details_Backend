const Sequelize = require('sequelize');
const db = require('../database/dbconfig');

const Insurance = db.define('Insurance_Details', {
    Policy_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Date_Of_Purchase: {
        type: Sequelize.DATE,
    },
    Customer_id: {
        type: Sequelize.INTEGER
    },
    Fuel: {
        type: Sequelize.TEXT
    },
    VEHICLE_SEGMENT: {
        type: Sequelize.CHAR
    },
    Premium: {
        type: Sequelize.INTEGER
    },
    Bodily_Injury_Liability: {
        type: Sequelize.CHAR
    },
    Personal_Injury_Protection: {
        type: Sequelize.CHAR
    },
    Property_Damage_Liability: {
        type: Sequelize.CHAR
    },
    collision: {
        type: Sequelize.CHAR
    },
    comprehensive: {
        type: Sequelize.CHAR
    },
    Customer_Gender: {
        type: Sequelize.TEXT
    },
    Customer_Income_Group: {
        type: Sequelize.TEXT
    },
    Customer_Region: {
        type: Sequelize.TEXT
    },
    Customer_Marital_Status: {
        type: Sequelize.CHAR
    }
 },
    {
        timestamps: false,
    })

module.exports = Insurance;