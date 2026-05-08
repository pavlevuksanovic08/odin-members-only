const express = require('express');

const router = express.Router();
const authController = require('../controllers/authentication');

router.get('/', (req, res) => res.send("<p>you are on index route</p>"));
router.get('/sing-up', authController.getSingUp);

module.exports = router;