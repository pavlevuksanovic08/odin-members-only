const express = require('express');

const router = express.Router();
const controller = require('../controllers/messages')

const authenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/log-in')
}

const isAdminAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/log-in')
    }    
    
    if (req.user.isadmin) {
        return next();
    }

    return res.status(403).send("Forbidden: Only admins can delete messages.")
}

router.get('/create', authenticate,controller.getCreateMessage);
router.post('/create', authenticate, controller.postCreateMessage)
router.post('/:id/delete', isAdminAuth, controller.postDeleteMessage);

module.exports = router;