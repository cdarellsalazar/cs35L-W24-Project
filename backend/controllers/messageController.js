//logic for handling HTTP requests that relate to message operations
const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');
const { getConversation } = require('./conversationController');

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { participants, sender, receiver, msg } = req.body;
        console.log("----------------------")
        const conversationID = await Conversation.getConversationIDfromParticipants(participants) 
        console.log(conversationID)
        const message = await Message.create({
            conversation: conversationID,
            sender: sender,
            receiver: receiver,
            content: msg
        });
        await Conversation.findByIdAndUpdate(conversationID, { $push: { messages: message._id } });
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all messages for a user

exports.testExampleFunction = async (req, res) => {
    console.log('asdasd');
    
    console.log('asdasd');
}

exports.getMessage = async (req, res) => {
    try {
        const messageId = req.params.messageID; 
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.status(200).json(message);
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

const reactionValues = {
    like: 0,
    dislike: 1,
    love: 2,
    shock: 3
};

exports.updateReactions = async (messageId, userId, type) => {
    try {
        console.log(`Received reaction update request: messageId=${messageId}, userId=${userId}, type=${type}`);

        const message = await Message.findById(messageId);
        console.log(`Found message: `, message);

        if (!message) {
            throw new Error('Message not found');
        }

        // Find if the user has already reacted
        const existingReactionIndex = message.reactions.findIndex(reaction => reaction.reactedBy.toString() === userId.toString());
        console.log(`Existing reaction index: ${existingReactionIndex}`);

        // Assign numerical value based on reaction type
        const reactionValue = reactionValues[type];
        if (reactionValue === undefined) {
            throw new Error('Invalid reaction type');
        }

        const reaction = {
            reactedBy: userId,
            type: type,
            value: reactionValue
        };
        console.log(`Reaction to be updated or added: `, reaction);

        // Update or add reaction
        if (existingReactionIndex >= 0) {
            message.reactions[existingReactionIndex] = reaction;
            console.log('Updated existing reaction');
        } else {
            message.reactions.push(reaction);
            console.log('Added new reaction');
        }

        await message.save();
        console.log('Saved message with updated reactions');

        return message;
    } catch (error) {
        console.error('Error updating reaction: ', error.message);
        throw new Error(error.message);
    }
};
