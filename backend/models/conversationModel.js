const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User', //refer to the user model
        required: true,
    }],
    messages: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Message'  //refer to the message model
    }]
})

conversationSchema.path('messages').default([]);

conversationSchema.statics.addMessage = async function(messageId) {
    this.messages.push(messageId);
}

conversationSchema.statics.getMessageIDfromConversation = async function (conversationID) {
    
    const messageIDs = await Conversation.findById(conversationID).populate('messages')

    return messageIDs
}

conversationSchema.statics.getParticipants = async function (conversationID, userID) {
    console.log('conversation: ', conversationID, 'userID: ', userID)

    const conversation = await Conversation.findById(conversationID)

    let otherParticipants = [];

    if (conversation && conversation.participants) {
        otherParticipants = conversation.participants.filter(participant => participant && participant.toString() !== userID.toString())
    }

    return otherParticipants
}

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;