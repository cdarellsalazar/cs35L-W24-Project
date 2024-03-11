const Conversation = require('../models/conversationModel');
const User = require('../models/userModel')

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
    const userID = req.user._id

   //console.log('user: ', userID)

    const conversations = await Conversation.find({ participants: { $in: [userID]}})

    //console.log('conversations: ', conversations)

    res.status(200).json(conversations)
}

exports.getRenderInfo = async (req, res) => {
    console.log(req)
    try{
        const conversationID = req.body.conversationID
        //const userID = req.user._id
        const userID = req.body.userID
        console.log(userID)
        console.log(conversationID)
        const info = await Conversation.getParticipants(conversationID, userID)
        const renderInfo = User.findById(info)
        console.log(renderInfo)
        res.status(200)
    } catch(error) {
        console.log(error)
        res.status(400).json({error: error.message });
    }

}

exports.getMessagesFromConvo = async (req, res) => {
    try{
        const converationID = req.body.converationID
        //console.log('conversationID: ', converationID)
        const messages = await Conversation.findById(converationID).populate('messages')
        //console.log('success')
        res.status(200).json(messages)
    } catch(error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}
    
