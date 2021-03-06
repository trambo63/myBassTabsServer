const router = require('express').Router();
const {models} = require('../models');
const { validateSession } = require('../middleware');
// const upload = require('../services/file-upload');
const multer = require('multer');
const fs = require('fs');
const upload = multer({dest: "./uploads"});
const {authRole} = require('../services/basicAuth')


router.post('/postTab', validateSession, upload.single('image'), async (req, res) => {
    let fileType = req.file.mimetype.split("/")[1]
    let newFileName = req.file.filename + "." + fileType

    fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, () => {
        console.log('callback');
    })
    
    const {title, difficulty} = req.body;

    try {
        await models.TabModel.create({
            title: title,
            difficulty: difficulty,
            imgUrl: newFileName,
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
            error: `Failed to create tab Friend!: ${err}`
        });
    };
});

router.get('/allTabs', async (req, res) => {
    try{
        await models.TabModel.findAll()
        .then(tabs => {
            res.status(200).json({
                tabs: tabs,
                message: "Tabs retrived!"
            })
        })
    }catch (err) {
        res.status(500).json({
            message: `Failed to retrive tabs Friend!: ${err}`
        })
    }
})

router.get('/:title', async (req, res) => {
    try{
        await models.TabModel.findAll({
            where: {
                title: req.params.title
            }
        }).then(tabs => {
            res.status(200).json({
                tab: tabs,
                message: 'tabs retrived'
            })
        })
    }catch (err) {
        res.status(500).json({
            message: `Failed to retrive tabs Guy!: ${err}`
        })
    }
});

router.put ('/like/:id', validateSession, async (req, res) => {
    const {likes} = req.body;
    try{
        await models.TabModel.update({
            likes: likes,
        }, {
            where: {
                id: req.params.id
            }
        }).then(tab => {
            res.status(200).json({
                tab: tab,
                message: "tab updated"
            })
        })
    }catch(err) {
        res.status(500).json({
            message: `Failed to update tab Buddy!: ${err}`,
        })
    }
})

router.put ('/dislike/:id', validateSession, async (req, res) => {
    const {dislikes} = req.body;
    try{
        await models.TabModel.update({
            dislikes: dislikes,
        }, {
            where: {
                id: req.params.id
            }
        }).then(tab => {
            res.status(200).json({
                tab: tab,
                message: "tab updated"
            })
        })
    }catch(err) {
        res.status(500).json({
            message: `Failed to update tab Buddy!: ${err}`,
        })
    }
})

router.put('/:id', validateSession, upload.single('image'), async (req, res) => {
    let fileType = req.file.mimetype.split("/")[1]
    let newFileName = req.file.filename + "." + fileType

    fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFileName}`, () => {
        console.log('callback');
    })
    const {title, difficulty} = req.body;
    try{
        await models.TabModel.update({
            title: title,
            imgUrl: newFileName,
            difficulty: difficulty
        }, {
            where: {
                id: req.params.id
            }
        }).then(tab => {
            res.status(200).json({
                tab: tab,
                message: "tab updated"
            })
        })
    }catch(err) {
        res.status(500).json({
            message: `Failed to update tab Buddy!: ${err}`,
        })
    }
});

router.delete('/:id', validateSession, async (req, res) => {
    try{
        await models.TabModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Tab Destroyed"
        })
    } catch (err) {
        res.status(500).json({
            message: `Unable to Destroy Tab Friend!: ${err}`
        })
    }
});

const ROLE = {
    ADMIN: 'admin',
    USER: 'user'
}

router.delete('/auth/:id', validateSession, authRole(ROLE.ADMIN), async (req, res) => {
    try{
        await models.TabModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Tab Destroyed"
        })
    } catch (err) {
        res.status(500).json({
            message: `Unable to Destroy Tab Friend!: ${err}`
        })
    }
});

module.exports = router;