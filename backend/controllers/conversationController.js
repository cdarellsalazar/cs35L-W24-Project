const Conversation = require('../models/conversationModel');

exports.startConversation = async (req, res) => {
    try {
        const { participants } = req.body;
        const conversation = await Conversation.create({ 
            participants
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};
