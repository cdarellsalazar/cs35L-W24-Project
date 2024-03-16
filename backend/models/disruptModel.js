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

disruptSchema.methods.userResponse = async function (user) {
    if (user.dailyDisruptReaction == 'Yes') {
        return 'Yes'
    }
    else if (user.dailyDisruptReaction == 'No') {
        return 'No'
    }
    else {
        throw Error('This user does not have a response yet')
    }
}

disruptSchema.methods.addUserToQueue = async function (user) {

    if (user.dailyDisruptReaction == 'Yes') {
        this.yesResponse.push(userID)
    }
    else if (user.dailyDisruptReaction == 'No') {
        this.noResponse.push(userID)
    }
    else {
        throw Error('This user cannot be added to the queue, as they have not selected a dailydisrupt response yet')
    }

    await this.save()
}

disruptSchema.methods.popFromYesQueue = async function () {
    const userID = await this.yesResponse.shift()
    await this.save()

    return userID
}


disruptSchema.methods.popFromNoQueue = async function () {
    const userID = await this.noResponse.shift()
    await this.save()

    return userID
}

disruptSchema.methods.popBothFromQueueAndUpdateResponse = async function () {

    const User = mongoose.model('User')

    const participants = {
        yesUserID: null,
        noUserID: null
    }

    if (this.yesResponse.length >= 1 && this.noResponse.length >= 1) {
        participants.yesUserID = await this.popFromYesQueue()
        participants.noUserID = await this.popFromNoQueue()

        console.log(participants)

        const updatedYesUser = await User.findByIdAndUpdate(participants.yesUserID, { dailyDisruptReaction: 'NoSelection' }, { new: true })
        if (!updatedYesUser) {
          throw new Error('User not found')
        }
        const updatedNoUser = await User.findByIdAndUpdate(participants.noUserID, { dailyDisruptReaction: 'NoSelection' }, { new: true })
        if (!updatedNoUser) {
          throw new Error('User not found')
        } 
    }

    return participants
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
    if (this.yesResponse.length === 0) {
        return true
    }
    else {
        return false
    }
}

disruptSchema.methods.noEmpty = async function () {
    if (this.noResponse.length === 0) {
        return true
    }
    else {
        return false
    }
}

disruptSchema.statics.disruptPopFromQueueAndReturnParticipants = async (userID) => {
    try {
        const User = mongoose.model('User')
        const user = await User.findById(userID)
        const disruptQueue = await Disrupt.findOne()
        if(!disruptQueue) {
            throw new Error('Could not find the disrupt queue. Please check if it has been created properly')
        }

        if (!disruptQueue.yesResponse.includes(userID) && !disruptQueue.noResponse.includes(userID)) {
            await disruptQueue.addUserToQueue(user);
        }

        const userResponse = await disruptQueue.userResponse(user)

        let matchFound
        let participants

        const participantsUsername = {
            yesUsername: null,
            noUsername: null
        }

        if (userResponse === 'Yes') {
            matchFound = !await disruptQueue.noEmpty()
            if (matchFound) {
                participants = await disruptQueue.popBothFromQueueAndUpdateResponse()
                const yesUser = await User.findById(participants.yesUserID)
<<<<<<< HEAD
                const noUser = await User.findById(participants.noUserID)
                participantsUsername.yesUsername = yesUser.username
                participantsUsername.noUsername = noUser.username
=======
                participantsUsername.yesUsername = yesUser.username
>>>>>>> main
            }
        } 
        else {
            matchFound = !await disruptQueue.yesEmpty()
            if (matchFound) {
                participants = await disruptQueue.popBothFromQueueAndUpdateResponse()
<<<<<<< HEAD
                const yesUser = await User.findById(participants.yesUserID)
                const noUser = await User.findById(participants.noUserID)
                participantsUsername.yesUsername = yesUser.username
=======
                const noUser = await User.findById(participants.noUserID)
>>>>>>> main
                participantsUsername.noUsername = noUser.username
            }
        }
        console.log(participantsUsername)
        return { matchFound, participantsUsername }
    } catch (error) {
        console.log(error)
    }
}

const Disrupt = mongoose.model('Disrupt', disruptSchema)

module.exports = Disrupt;

