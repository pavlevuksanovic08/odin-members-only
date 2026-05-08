const express = require('express');

const router = express.Router();

router.get('/', (req, res,) => res.send("<p>you are on index route</p>"));

module.exports = router;