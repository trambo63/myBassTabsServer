const router = require('express').Router();
const {models} = require('../models');
const { validateSession } = require('../middleware');
const upload = require('../services/file-upload')


router.post('/postTab', validateSession, upload.single('image'), async (req, res) => {
    const {title, difficulty} = req.body;

    try {
        await models.TabModel.create({
            title: title,
            difficulty: difficulty,
            imgUrl: req.file.location,
            userId: req.user.id
        })
        .then(tab => {
            res.status(201).json({
                tab: tab,
                message: 'tab created',
            }); 
        })
    } catch (err) {
        res.status(500).json({
            error: `Failed to create tab ${err}`
        });
    };
});

module.exports = router;