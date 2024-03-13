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
        type: Date,
        default: Date.now, // default to the current time
    },
    // field to record when the message was read
    readAt: {
        type: Date, // optional and only set when the message is read
    },
    reactions: [{
        reactedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        type: {
            type: String,
            enum: ['like', 'dislike', 'love', 'shock'],
            required: true
        },
        value: { // New field to store numerical representation of reactions
            type: Number,
            required: true
        }
    }]
}, { timestamps: true }); // 'timestamps' option adds 'createdAt' and 'updatedAt' fields automatically

// Export the Message model with the associated schema

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
