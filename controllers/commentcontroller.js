const router = require('express').Router();
const { validateSession } = require('../middleware');
const {models} = require('../models');

router.post('/postComment', validateSession, async (req, res) => {
    const {comment, tabId} = req.body.comment;

    try {
        await models.CommentModel.create({
            comment: comment,
            tabId: tabId,
            userId: req.user.id
        })
        .then(comment => {
            res.status(201).json({
                comment: comment,
                message: 'comment created'
            });
        })
    } catch (err) {
        res.status(500).json({
            error: `Failed to create comment: ${err}`
        })
    }
})

module.exports = router