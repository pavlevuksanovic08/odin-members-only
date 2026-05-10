const express = require('express');

const router = express.Router();
const authController = require('../controllers/authentication');

router.get('/', (req, res) => res.render("index", {user: req.user}));
router.get('/sing-up', authController.getSingUp);
router.post('/sing-up', authController.postSingUp);
router.get('/log-in', authController.getLogIn);
router.post('/log-in', authController.postLogIn);
router.get('/join-the-club', (req, res) => res.render("jointheclub"))
router.post('/join-the-club', authController.postJoinTheClub)

module.exports = router;