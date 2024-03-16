const Conversation = require('../models/conversationModel');
const User = require('../models/userModel')
const Messages = require('../models/messageModel')

exports.startConversation = async (req, res) => {
    try {
        console.log("req body:", req.body)
        const userID = req.user._id
        const { recipient } = req.body
        console.log(recipient)
        const recipientObject = await User.findOne({username: `${recipient}` })

        console.log('Recipient Object: ', recipientObject)

        const recipientID = recipientObject._id
        
        const participants  = [userID, recipientID];

        const duplicateCheck = await Conversation.findOne({ participants: { $all: participants } });

        if(duplicateCheck){
            throw new Error('A conversation already exists between these users')
        }

        const conversation = await Conversation.create({ 
            participants
        });

        recipientObject.conversations.push(conversation);

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
   // console.log("running");
    const userID = req.user._id
    
   //console.log('user: ', userID)

    const conversations = await Conversation.find({ participants: { $in: [userID]}})

   // console.log('conversations: ', conversations)

    res.status(200).json(conversations)
}

exports.getRenderInfo = async (req, res) => {
    try{
        const conversationID = req.body.conversationID
        const userID = req.user._id
        const info = await Conversation.getParticipants(conversationID, userID)
        const renderInfo = await User.findById(info)
        let renderJSON = renderInfo.toJSON();
        renderJSON['conversationID'] = conversationID
        res.status(200).json(renderJSON);
    } catch(error) {
        res.status(400).json({error: error.message });
    }

}

exports.getMessagesFromConvo = async (req, res) => {
    try{
        
        const { conversationID } = req.body
       //console.log('conversationID: ', conversationID)
        conversation = await Conversation.findById(conversationID)
        //console.log('conversation: ', conversation)
        const messages = conversation.messages
        //console.log('success')
        const renderList = []
      //  console.log('messages: ', messages)
        for(const messageID of messages){
            const message = await Messages.findById(messageID)
            renderList.push(message);
        }
     //   console.log('renderList: ', renderList)
        res.status(200).json(renderList)
    } catch(error) {
        console.log('GET ERROR: ', error)
        res.status(400).json({ error: error.message })
    }
}
    
