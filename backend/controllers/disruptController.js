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

exports.disruptPopFromQueueAndReturnParticipants = async (req, res) => {
    const disruptQueue = await Disrupt.findOne()
    if(!disruptQueue) {
        throw new Error('Could not find the disrupt queue. Please check if it has been created properly')
    }
    const userID = req.user._id

    if (!disruptQueue.yesResponse.includes(userID) && !disruptQueue.noResponse.includes(userID)) {
        await disruptQueue.addUserToQueue(userID);
    }

    const userResponse = await disruptQueue.userResponse()
    let matchFound
    let participants

    if (userResponse === 'Yes') {
        let matchFound = !await disruptQueue.noEmpty()
        if (matchFound) {
            participants = await disruptQueue.popBothFromQueueAndUpdateResponse()
        }
        else {
            participants = null
        }
    } 
    else {
        let matchFound = !await disruptQueue.yesEmpty()
        if (matchFound) {
            participants = await disruptQueue.popBothFromQueueAndUpdateResponse()
        }
        else {
            participants = null
        }
    }
    return res.status(200).json({ matchFound, participants })
}