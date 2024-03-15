//logic for handling HTTP requests that relate to message operations
const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');
const { getConversation } = require('./conversationController');
const User = require('../models/userModel');

// Send a message
exports.sendMessage = async (req, res) => {
    //console.log('running')
    try {
        const {conversationID, receiver, msg } = req.body;
        sender = req.user._id.toString();
        console.log('sender: ', sender) 

        partcipants = [sender, receiver] 
        console.log('participants: ', partcipants)

        blockCheck = await User.checkBlocked(sender, receiver)
        console.log('blockCheck: ', blockCheck)
        if(blockCheck){
            throw new Error('User is blocked or has recipient blocked')
        }
        //console.log('here')
        const message = await Message.create({
            conversation: conversationID,
            sender,
            receiver,
            content: msg
        });
        await Conversation.findByIdAndUpdate(conversationID, { $push: { messages: message._id } });
      //  console.log('message: ', message )
        res.status(200).json(message);
    } catch (error) {
        console.log('error: ', error.message)
        res.status(400).json({ error: error.message });
    }
}

// Get all messages for a user

exports.testExampleFunction = async (req, res) => {
    //console.log('asdasd');
    
    //console.log('asdasd');
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

const reactionValues = {
    like: 1,
    dislike: 2,
    heart: 3,
    shock: 4
};


exports.updateReactions = async (messageId, reactionType) => {
    try {
        const message = await Message.findById(messageId);
        if (!message) {
           // console.log('Message not found');
            throw new Error('Message not found');
        }

        const reactionValue = reactionValues[reactionType];
        if (reactionValue === undefined) {
            //('Invalid reaction type');
            throw new Error('Invalid reaction type');
        }

        // Directly set the reaction to the corresponding integer value
        message.reactions = reactionValue;

        await message.save();
        //console.log(`Message ${messageId} updated with reaction ${reactionType} (value: ${reactionValue})`);

        return message;
    } catch (error) {
        console.error(`Error updating reaction: ${error.message}`);
        throw new Error(error.message);
    }
};
