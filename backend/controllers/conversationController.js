const Conversation = require('../models/conversationModel');
const User = require('../models/userModel')
const Messages = require('../models/messageModel')

exports.startConversation = async (req, res) => {
    try {
        //console.log(req.body)
        userID = req.user._id
        const { recipient } = req.body
        console.log(recipient)
        try {
            recipientID = await User.findOne({username: `${recipient}` }).select('_id')
        } catch (error) {
            throw error
        }
        const participants  = [userID, recipientID];

        const conversation = await Conversation.create({ 
            participants
        });
        res.status(200).json(conversation);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
}

exports.getConversation = async (req, res) => {
    try {
        const conversationID = req.params.conversationID;
        const conversation = await Conversation.find({
            ID: conversationID
        }).populate('conversation');
        res.status(200).json(conversation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.fetchConversations = async (req, res) => {
    console.log("running");
    const userID = req.user._id
    
   //console.log('user: ', userID)

    const conversations = await Conversation.find({ participants: { $in: [userID]}})

    console.log('conversations: ', conversations)

    res.status(200).json(conversations)
}

exports.getRenderInfo = async (req, res) => {
    try{
        const conversationID = req.body.conversationID
        const userID = req.user._id
        //console.log(userID)
        //console.log(conversationID)
        const info = await Conversation.getParticipants(conversationID, userID)
        //console.log(info)
        const renderInfo = await User.findById(info)
        let renderJSON = renderInfo.toJSON();
        renderJSON['conversationID'] = conversationID
        //console.log(renderInfo)
        //console.log(userID)
        //console.log(conversationID)
        res.status(200).json(renderJSON);
    } catch(error) {
        console.log(error)
        res.status(400).json({error: error.message });
    }

}

exports.getMessagesFromConvo = async (req, res) => {
    try{
        const conversationID = req.body.conversationID
        console.log('conversationID: ', conversationID)
        conversation = await Conversation.findById(conversationID)
        console.log('conversation: ', conversation)
        const messages = conversation.messages
        //console.log('success')
        const renderList = []
        console.log('messages: ', messages)
        for(const messageID of messages){
            const message = await Messages.findById(messageID)
            renderList.push(message);
        }
        console.log('renderList: ', renderList)
        res.status(200).json(renderList)
    } catch(error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}
    
