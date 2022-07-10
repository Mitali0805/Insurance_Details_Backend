const express = require('express');
const router = express.Router();
const db = require('../database/dbconfig');
const Insurance = require('../models/insuranceModel');

// Get all insurance
router.get('/', (req, res) => {
    Insurance.findAll()
        .then(insurance => {
            res.send(insurance)
        })
        .catch(err => console.log(err))
})

// Get insurance by Policy_id & Customer_id
router.get('/find', (req, res) => {
    const { policyId, customerId } = req.query


    customerId && Insurance.findAll({
        where: {
            Customer_id: customerId
        }
    })
        .then(insurance => {
            res.status(200).send(insurance)
        })
        .catch(err => console.log(err))

    policyId && Insurance.findByPk(policyId)
        .then(insurance => {
            res.status(200).send(insurance)
        })
        .catch(err => console.log(err))
})

// update the insurance details
router.put('/insurance-details', (req, res) => {
    console.log(req.body);
    Insurance.update({
        Premium: req.body.premium,
        
    }, {
        where: {
            Policy_id: req.body.policyId
        }
    })
        .then(insurance => {
            res.status(200).send(insurance)
        })
        .catch(err => console.log(err))
})

// Add a Insurance
router.get('/add', (req, res) => {
    const data = {
        Policy_id: '12345',
        Date_of_Purchase: '2018-01-16',
        Customer_id: '400',
        Fuel: 'CNG',
        VEHICLE_SEGMENT: 'A',
        Premium: '958',
        Bodily_Injury_Liability: '0',
        Personal_Injury_Protection: '0',
        Property_Damage_Liability: '0',
        collision: '1',
        comprehensive: '1',
        Customer_Gender: 'Male',
        Customer_Income_Group: '0- $25K',
        Customer_Region: 'North',
        Customer_Marital_Status: '0'
    }

    const { Policy_id, Date_of_Purchase, Customer_id, Fuel, VEHICLE_SEGMENT, Premium, Bodily_Injury_Liability, Personal_Injury_Protection, Property_Damage_Liability, collision, comprehensive, Customer_Gender, Customer_Income_Group, Customer_Region, Customer_Marital_Status } = data;

    console.log(Date_of_Purchase, '#####')

    Insurance.create({
        Policy_id, Date_of_Purchase, Customer_id, Fuel, VEHICLE_SEGMENT, Premium, Bodily_Injury_Liability, Personal_Injury_Protection, Property_Damage_Liability, collision, comprehensive, Customer_Gender, Customer_Income_Group, Customer_Region, Customer_Marital_Status
    })
        .then(ins => console.log(ins, 'ins***'))
        .catch(err => console.log(err))
})

module.exports = router;