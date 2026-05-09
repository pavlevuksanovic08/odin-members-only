const bcryptjs = require('bcryptjs');
const userModel = require('../models/userModel')

exports.getSingUp = async (req, res) => {
    res.render('singup');
}

exports.postSingUp = async (req, res, next) => {
    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const userdata = {
            first: req.body.first,
            last: req.body.last,
            username: req.body.username,
            password: hashedPassword
        };
        await userModel.addUser(userdata);
        res.redirect('/')
    } catch (err) {
        console.error(err);
        next(err);
    }
}