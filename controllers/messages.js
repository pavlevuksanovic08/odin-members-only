const messageModel = require('../models/messageModel')

exports.getCreateMessage = (req, res) => {
    res.render("createmessage");
}

exports.postCreateMessage = async (req, res) => {

    try {
        const msgData = {
            title: req.body.title,
            message: req.body.message,
            userid: req.user.id
        }

        await messageModel.addNewMessage(msgData);

        res.redirect('/')
    } catch(err) {
        res.status(403).send(err.mesage)
        console.error(err)
    }
    
}