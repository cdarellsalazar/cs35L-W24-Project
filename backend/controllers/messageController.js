//logic for handling HTTP requests that relate to message operations
const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');
const { getConversation } = require('./conversationController');

// Send a message
exports.sendMessage = async (req, res) => {
    console.log('running')
    try {
        const {conversationID, receiver, msg } = req.body;
        sender = req.user._id
        partcipants = [sender, receiver] 
        console.log('here')
        const message = await Message.create({
            conversation: conversationID,
            sender,
            receiver,
            content: msg
        });
        await Conversation.findByIdAndUpdate(conversationID, { $push: { messages: message._id } });
        console.log('message: ', message )
        res.status(200).json(message);
    } catch (error) {
        console.log('error: ', error.message)
        res.status(400).json({ error: error.message });
    }
}

// Get all messages for a user

exports.testExampleFunction = async (req, res) => {
    console.log('asdasd');
    
    console.log('asdasd');
}

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

// Get all messages for a user based on a search query
exports.getMessagesWithSearchQuery = async (req, res) => {
    try {
        const searchQuery = req.query.search; // Use the 'search' query parameter from the request

        // Find messages where the content matches the search query (case-insensitive)
        const messages = await Message.find({
            content: { $regex: new RegExp(searchQuery, 'i') } // Case-insensitive search
        }).sort({ createdAt: -1 }); // Sort by creation date, newest first

        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


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
const updateReactions = async (req, res) => {
    const { messageId } = req.params; 
    const { userId, type } = req.body;

    
    const validReactions = ['love', 'shock', 'dislike', 'like'];
    if (!validReactions.includes(type)) {
        return res.status(400).json({ error: 'Invalid reaction type' });
    }

    try {
        
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        
        const existingReactionIndex = message.reactions.findIndex(
            (reaction) => reaction.reactedBy.toString() === userId && reaction.type === type
        );

        if (existingReactionIndex > -1) {
            
            message.reactions.splice(existingReactionIndex, 1);
        } else {
            
            message.reactions.push({ reactedBy: userId, type });
        }

        await message.save();
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





