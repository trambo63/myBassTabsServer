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
});

router.put('/:id', validateSession, async (req, res) => {
    const {comment} = req.body.comment;
    try{
        await models.CommentModel.update({
            comment: comment
        }, {
            where: {
                id: req.params.id
            }
        }).then(comment => {
            res.status(200).json({
                comment: comment,
                message: "comment updated"
            })
        })
    }catch(err) {
        res.status(500).json({
            message: `Failed to update commnet Buddy!: ${err}`,
        })
    }
});

router.delete('/:id', validateSession, async (req, res) => {
    try{
        await models.CommentModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Comment Destroyed"
        })
    } catch (err) {
        res.status(500).json({
            message: `Unable to Destroy Comment Friend!: ${err}`
        })
    }
});

module.exports = router