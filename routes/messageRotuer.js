const express = require('express');

const router = express.Router();
const controller = require('../controllers/messages')

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/log-in')
}

router.get('/create', authenticate,controller.getCreateMessage);
router.post('/create', authenticate, controller.postCreateMessage)

module.exports = router;