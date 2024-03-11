const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants: {
        type: [Schema.Types.ObjectId],
        required: true
    },

    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
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
    //console.log('conversation: ', conversationID)

    const conversation = await Conversation.findById(conversationID).populate('participants')

    const otherParticipants = conversation.participants.filter(participant => participant !== userID)

    return otherParticipants
}

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;