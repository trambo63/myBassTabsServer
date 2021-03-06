const router = require('express').Router();
const {models} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/register', async (req, res) => {
    const {userName, email, password} = req.body.user;
    const ROLE = {
        ADMIN: 'admin',
        USER: 'user'
    }
    if (password == "admin"){
        try {
            await models.UserModel.create({
                userName: userName,
                email: email,
                role: ROLE.ADMIN,
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
    } else {
        try {
            await models.UserModel.create({
                userName: userName,
                email: email,
                role: ROLE.USER,
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
    }
})

router.post('/login', async (req, res) => {
    const { userName, password } = req.body.user

    try{
        await models.UserModel.findOne ({
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

router.get('/userdata', async (req, res) => {
    try{
        await models.UserModel.findAll({
            include: [
                {
                    model: models.TabModel,
                    include: [
                        {
                            model: models.CommentModel
                        }
                    ]
                }
            ]
        }).then(users => {
            res.status(200).json({
                user: users
            });
        })
    } catch (err) {
        res.status(500).json({
            error: `Failed to retrieve users: ${err}`
        });
    };
})

module.exports = router;
