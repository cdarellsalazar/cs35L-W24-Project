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
    conversationSchema.messages.push(messageId);
}

conversationSchema.statics.getMessageIDfromConversation = async function (conversationID) {
    
    const messageIDs = await Conversation.findById(conversationID).populate('messages')

    return messageIDs
}

conversationSchema.statics.getConversationIDfromParticipants = async function (participantIDs) {

    if (participantIDs.length === 0) {
        throw Error('There are no participants in this conversation')
    }

    const conversationID = await Conversation.findOne({
        participants: { $all: participantIDs }
    }); 

    if (conversationID) {
        return conversationID._id
    }
    else {
        throw Error('There does not exist a conversation for the given participants')
    }
}

conversationSchema.statics.getParticipants = async function (conversationID, userID) {
    //console.log('conversation: ', conversationID, 'userID: ', userID)

    const conversation = await Conversation.findById(conversationID)

   // console.log(conversation)

    const otherParticipants = conversation.participants.filter(participant => participant.toString() !== userID.toString())

    //console.log(otherParticipants)

    return otherParticipants
}

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;