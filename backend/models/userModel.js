//File containing schema for user objects, as well as signup and login methods for the users

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Conversation = require('./conversationModel')

const Schema = mongoose.Schema

//Establishes schema for a user object, contains an email and a password.
const userSchema = new Schema({
    /*userID: {
        type: String,
        required: true,
        unique: true
    },*/ //No need, as mongo automatically creates a unique ObjectID when not given. 
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    activeTime: {
        type: Date,
        default: Date.now
    },
    conversations: [{
        type: Schema.Types.ObjectId,
        ref: 'Conversation' //refers to the conversation model. 
    }]
})

userSchema.statics.getConversations = async function(userID) {

    const user = await userSchema.findById(userID).populate('conversations')

    return user

}


userSchema.statics.getAllParticipants = async function (userID) {

    const user = await userSchema.findById(userID)

    const listOfConversationIDs = user.conversations

    const allParticipants = new Set()

    for (let conversationID of listOfConversationIDs) {

        const conversation = await Conversation.findById(conversationID).populate('participants')

        const otherParticipants = conversation.participants.filter(participant => participant !== userID)

        for (let participants of otherParticipants) {
            
            allParticipants.add(participants)

        }
    }

    return allParticipants
}

userSchema.statics.loadConversationInfo = async function (userID) {
    const user = await userSchema.findById(userID)

    const userList = await getAllParticipants(user.userID)

    const infoList = []

    for(let user of userList){
        const info = await this.findById('user')
        infoList.push(info)
    }

    return infoList

}

// static signup method
userSchema.statics.signup = async function(email, password) {

    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt) //password encryption step

    const user = await this.create({ email, password: hash }) //creates user in database

    return user
}

//static login method
userSchema.statics.login = async function(email, password) {

    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }

    return user //compares info sent in with info in database
}

const User = mongoose.model('User', userSchema)

module.exports = User;