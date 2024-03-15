const Conversation = require('../models/conversationModel');
const User = require('../models/userModel')
const Messages = require('../models/messageModel')
const Disrupt = require('../models/disruptModel')

exports.createDisruptModel = async (req, res) => {
    const existingDisruptInstance = await Disrupt.findOne();
    if (!existingDisruptInstance) {
        await Disrupt.create({
            yesResponse: [],
            noResponse: []
        });
    }
}