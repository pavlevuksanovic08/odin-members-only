const messageModel = require('../models/messageModel')


exports.indexController = async (req, res) => {
    try {
        let messages;
        if (req.user) {
            messages = await messageModel.getAllMessagesWAuthor();
        } else {
            messages = await messageModel.getAllMessages();
        }

        res.render('index', {messages, user: req.user})
    } catch (err) {
        console.error(err)
    }

}