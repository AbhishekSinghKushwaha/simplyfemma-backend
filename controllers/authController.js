const express = require('express');
const router = express.Router();
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bankModel = require('../models/masterData/bankModel');


router.post('/', (req, res) => {
    const {
        bankCode
    } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Bank Code is  Required"
        })
    }

    bankModel.findOne({
            bankCode
        })
        .then(bank => {
            if (!bank) return res.status(400).json({
                message: 'Bank Code Field Does Not Exists'
            })
            jwt.sign({
                    id: bank.id
                },
                config.jwtSecret, {
                    expiresIn: 1036800
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        id: bank.id,
                        bankCode: bank.bankCode,
                        bankName: bank.bankName,
                        bankAddress: bank.bankAddress,
                    })
                }
            )
        })
        .catch(err => res.status(400))
});

module.exports = router;