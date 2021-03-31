const router = require('express').Router();
const {UserModel} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/register', async (req, res) => {
    const {userName, email, password} = req.body.user;
    try {
        await UserModel.create({
            userName: userName,
            email: email,
            password: bcrypt.hashSync(password, 10)
        })
        .then(user => {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                res.status(201).json({
                    user: user,
                    message: 'user created',
                    sessionToken: `Bearer ${token}`
                })
            }
        )
    } catch (err) {
        if(err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Username already in use'
            });
        } else {
            res.status(500).json({
                error: `Failed to register user: ${err}`
            });
        };
    };
})

router.post('/login', async (req, res) => {
    const { userName, password } = req.body.user

    try{
        await UserModel.findOne ({
            where: {
                userName: userName
            }
        })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, match) => {
                    if (match) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                        res.status(201).json({
                            user: user,
                            message: "logged in",
                            sessionToken: `Bearer ${token}`
                        })
                    } else {
                        res.status(502).send({
                            error: 'bad gateway'
                        })
                    }
                })
            } else {
                res.status(500).send({
                    error: 'failed to authenticate'
                })
            }
        })
    } catch (err) {
        res.status(501).send({
            error: 'server does not support this'
        })
    }
})

module.exports = router;
