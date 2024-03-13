//Properties of the message
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const messageSchema = new Schema({
    // field with a reference to the User schmema
    conversation: {
        type: Schema.Types.ObjectId,
        required: [true, 'A conversation is required for this message'],
        ref: 'Conversation'
    },
    sender: {
        type: Schema.Types.ObjectId,
        required: [true, 'A sender is required for the message'], 
        ref: 'User' 
    },
    //field with a reference to the User schema
    receiver: {
        type: Schema.Types.ObjectId,
        required: [true, 'A receiver is required for the message'], 
        ref: 'User' 
    },
    // field to store the message text
    content: {
        type: String,
        required: [true, 'Message content cannot be empty'], 
    },
    // field to record when the message was sent
    sentAt: {
        type: String,
        default: () => {
            const now = new Date();
            const month = String(now.getHours() + 1).padStart(2, '0'); 
            const date = String(now.getMinutes()).padStart(2, '0');
            return `${month}:${date}`;
        }
    },
    // field to record when the message was read
    readAt: {
        type: Date, // optional and only set when the message is read
    },
    reactions: {
        type: Number,
        default: 0 
    },
}, { timestamps: true }); // 'timestamps' option adds 'createdAt' and 'updatedAt' fields automatically

// Export the Message model with the associated schema

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
