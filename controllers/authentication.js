const bcryptjs = require('bcryptjs');
const userModel = require('../models/userModel')
const passport = require('passport')
const { body, validationResult } = require('express-validator')

exports.getSingUp = (req, res) => {
    res.render('singup');
}

const validateSingupForm = [
    body("first").trim().escape()
    .isAlpha().withMessage("First name can olny have letters.")
    .isLength({min: 2}).withMessage("First name must have at least 2 characters.")
    .isLength({max: 30}).withMessage("First name must have less than 30 characters."),
    body("last").trim().escape()
    .isAlpha().withMessage("Last name can olny have letters.")
    .isLength({min: 2}).withMessage("Last name must have at least 2 characters.")
    .isLength({max: 30}).withMessage("Last name must have less than 30 characters."),
    body("username").trim().escape().toLowerCase()
    .isLength({min: 2}).withMessage("Username must have at least 2 characters.")
    .isLength({max: 30}).withMessage("Username must have less than 30 characters.")
    .custom(async (value) => {
        const user = await userModel.getUserByUsername(value.toLowerCase());

        if (user) throw new Error("Usrrname is already in use.");

        return true;
    }),
    body("password").trim()
    .isLength({min: 5}).withMessage("Password must be at least 5 characters."),
    body("confirm").trim()
    .custom((value, { req }) => {

        if (value !== req.body.password) throw new Error("Passwords are not the same.")

        return true;
    })
]

exports.postSingUp = [
    validateSingupForm,
    async (req, res, next) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.render("singup", {errors: errors.array()})
            }
            const hashedPassword = await bcryptjs.hash(req.body.password, 10);
            const userdata = {
                first: req.body.first,
                last: req.body.last,
                username: req.body.username,
                password: hashedPassword,
                admin: req.body.admin === '1' ? true : false
            };
            console.log(userdata)
            await userModel.addUser(userdata);
            return res.redirect('/')
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
]

exports.getLogIn = (req, res) => {
    res.render("login");
}

exports.postLogIn = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })(req, res, next)
}

exports.postJoinTheClub = async (req, res) => {
    const userPasscode = req.body.code;
    const id = req.user.id;

    if (userPasscode === process.env.JOIN_SECRET) {
        await userModel.addToClub(id);
        return res.redirect('/')
    } else {
        return res.render("jointheclub", {error: 'Wrong passcode.'});
    }
}