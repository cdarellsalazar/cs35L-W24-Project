//logic for handling HTTP requests that relate to message operations
const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel')

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { conversation, senderId, receiverId, content } = req.body;
        const message = await Message.create({
            //conversation: ,
            sender: senderId,
            receiver: receiverId,
            content: content,
        });
        
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all messages for a user
exports.getMessages = async (req, res) => {
    try {
        const userId = req.params.userId;
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }]
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
}

//Get all messages for a user based on a search query
exports.getMessagesWithSearchQuery = async (req, res) => {
    try {
        const userId = req.params.userId;
        const searchQuery = req.params.searchQuery;
        const messages = await Message.find({
            $and: [
                {$or: [{ sender: userId }, { receiver: userId }]},
                {content: contains(searchQuery)}
            ]
        });
        res.status(200).json(messages);
    } catch(error) {
        res.status(400).json({ error: error.message});
    }
}

// Get unread messages for a user
exports.getUnreadMessages = async (req, res) => {
    try {
        const userId = req.params.userId;
        const unreadMessages = await Message.find({
            receiver: userId,
            readAt: { $exists: false }
        });
        res.status(200).json(unreadMessages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Mark a message as read
exports.markMessageAsRead = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        const message = await Message.findByIdAndUpdate(messageId, {
            readAt: Date.now()
        }, { new: true });
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getMessage = async (req, res) => {
    try{
        messageID = req.params.messageID
        message = Message.findById(messageID)
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
