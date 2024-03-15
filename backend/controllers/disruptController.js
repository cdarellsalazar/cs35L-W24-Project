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

exports.createDisruptConversation = async (req, res) => {
    disruptQueue = await Disrupt.findOne()
    if(!disruptQueue) {
        throw new Error('Could not find the disrupt queue. Please check if it has been created properly')
    }
    const userID = req.user._id
    await disruptQueue.addUserToQueue(userID)
    userResponse = await disruptQueue.userResponse()
    /*
    if (userResponse == 'Yes') {
        if (await disruptQueue.noEmpty()) {
            res.status(200).json({ message: 'Loading Screen '})
        }
        else {
            res.status(200).json({ message: 'Create conversation with userID: ${disruptQueue.popFromNoQueue}'})
        }
    }
    else if (userResponse == 'No') {
        if (await disruptQueue.yesEmpty()) {
            res.status(200).json({ message: 'Loading Screen '})
        }
        else {
            res.status(200).json({ message: 'Create conversation with userID: ${disruptQueue.popFromYesQueue}'})
        }
    }*/
}