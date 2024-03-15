const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disruptSchema = new Schema({
    yesResponse: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    noResponse: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

disruptSchema.methods.userResponse = async function (userID) {
    if (userID.dailyDisruptReaction == 'Yes') {
        return 'Yes'
    }
    else if (userID.dailyDisruptReaction == 'No') {
        return 'No'
    }
    else {
        throw Error('This user does not have a response yet')
    }
}

disruptSchema.methods.addUserToQueue = async function (userID) {

    if (userID.dailyDisruptReaction == 'Yes') {
        this.yesResponse.push(userId)
    }
    else if (userID.dailyDisruptReaction == 'No') {
        this.noResponse.push(userID)
    }
    else {
        throw Error('This user cannot be added to the queue, as they have not selected a dailydisrupt response yet')
    }
}

disruptSchema.methods.popFromYesQueue = async function () {
    const userID = await this.yesResponse.shift()
    return userID
}


disruptSchema.methods.popFromNoQueue = async function () {
    const userID = await this.yesResponse.shift()
    return userID
}

disruptSchema.methods.popBothFromQueueAndUpdateResponse = async function () {

    const User = mongoose.model('User')

    const participants = {
        yesUserID: null,
        noUserID: null
    }

    if (this.yesResponse.length >= 1 && this.noResponse.length >= 1) {
        participants.yesUserID = popFromYesQueue
        participants.noUserID = popFromNoQueue

        const updatedYesUser = await User.findByIdAndUpdate(yesUserID, { dailyDisruptReaction: 'NoSelection' }, { new: true })
        if (!updatedYesUser) {
          throw new Error('User not found')
        }
        const updatedNoUser = await User.findByIdAndUpdate(noUserID, { dailyDisruptReaction: 'NoSelection' }, { new: true })
        if (!updatedNoUser) {
          throw new Error('User not found')
        } 
    }

    return userIds
}

disruptSchema.methods.clearQueues = async function () {
    disruptSchema.yesResponse = [];
    disruptSchema.noResponse = [];
}

disruptSchema.methods.getQueueLengths = async function () {
    return {
        yesQueueLength: this.yesResponse.length,
        noQueueLength: this.noResponse.length
    }
}

disruptSchema.methods.removeUserFromQueue = async function (userID) {
    this.yesResponse = this.yesResponse.filter(user => user.toString() !== userID.toString())
    this.noResponse = this.noResponse.filter(user => user.toString() !== userID.toString())
}

disruptSchema.methods.retrieveBothQueue = async function () {
    return {
        yesQueue: this.yesResponse,
        noQueue: this.noResponse
    }
}

disruptSchema.methods.yesEmpty = async function () {
    if (yesResponse.length === 0) {
        return true
    }
    else {
        return false
    }
}

disruptSchema.methods.noEmpty = async function () {
    if (noResponse.length === 0) {
        return true
    }
    else {
        return false
    }
}

const Disrupt = mongoose.model('Disrupt', disruptSchema)

module.exports = Disrupt;

