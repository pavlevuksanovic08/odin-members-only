const express = require('express');

const router = express.Router();
const authController = require('../controllers/authentication');
const indexController = require('../controllers/index')

router.get('/', indexController.indexController);
router.get('/sign-up', authController.getSingUp);
router.post('/sign-up', authController.postSingUp);
router.get('/log-in', authController.getLogIn);
router.post('/log-in', authController.postLogIn);
router.get('/join-the-club', (req, res) => res.render("jointheclub"))
router.post('/join-the-club', authController.postJoinTheClub)

module.exports = router;