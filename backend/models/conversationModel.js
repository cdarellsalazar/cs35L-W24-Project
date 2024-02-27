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

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;