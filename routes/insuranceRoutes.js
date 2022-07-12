const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { Op } = require('sequelize')
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
router.get('/find', (req, res, next) => {
    const { policyId, customerId } = req.query
    Insurance.findAll({
        where: {
            [Op.or]: [
                { Customer_id: customerId },
                { Policy_id: policyId }
            ]
        }
    })
        .then(insurance => {
            res.status(200).send(insurance)
        })
        .catch(err => {
            console.log(err)
            return next(err);
        })

})

// update the insurance details
router.put('/insurance-details', (req, res, next) => {
    Insurance.update({
        Premium: req.body.premium,
        Bodily_Injury_Liability: req.body.bodilyInjuryLiability,
        Customer_Gender: req.body.gender,
        Customer_Income_Group: req.body.incomeGroup,
        Customer_Marital_Status: req.body.maritalStatus,
        Customer_Region: req.body.region,
        Fuel: req.body.fuel,
        Personal_Injury_Protection: req.body.personalInjuryProtection,
        Property_Damage_Liability: req.body.propertyDamageLiability,
        VEHICLE_SEGMENT: req.body.vehichleSegment,
        collision: req.body.Collision,
        comprehensive: req.body.Comprehensive,
    }, {
        where: {
            Policy_id: req.body.policyId
        }
    })
        .then(insurance => {
            res.status(200).send(insurance)
        })
        .catch(err => {
            console.log(err)
            return next(err);
        })
})

// Get policy count for each month: To Populate Data in Graph
router.get('/policy-count', async(req, res, next) => {
    let arr = [];
    for (i = 1; i < 13; i++) {
        await Insurance.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('*')), 'PolicyId']
            ],
            where: sequelize.where(sequelize.fn('date_part', 'MONTH', sequelize.col('Date_Of_Purchase')), i)
        })
        .then(insurance => {
                const [data] = insurance
                arr.push(Number(data?.dataValues?.PolicyId))
        })
        .catch(err => {
                console.log(err)
                return next(err);
        })
    }
    res.status(200).send(arr)
})



module.exports = router;