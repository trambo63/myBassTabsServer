const router = require('express').Router();
const {models} = require('../models');
const { validateSession } = require('../middleware');

router.post('/postTab', validateSession, async (req, res) => {
    const {title, difficulty, }
})