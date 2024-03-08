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

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;