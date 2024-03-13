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
        required: true,
        unique: true
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
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' 
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
    }],

    blockedList: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

userSchema.statics.getConversations = async function(userID) {

    const user = await this.findById(userID).populate('conversations')

    return user

}

userSchema.statics.getAllParticipants = async function (listOfConversationIDs, userID) {
    
    const Conversation = mongoose.model('Conversation')

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

userSchema.statics.getMessageIDfromConversation = async function (conversationID) {
    
    const Conversation = mongoose.model('Conversation')

    const messageIDs = await Conversation.findById(conversationID).populate('messages')

    return messageIDs
}



// static signup method
userSchema.statics.signup = async function(username, email, password) {

    //validation
    if(!email || !password || !username){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const emailExists = await this.findOne({ email })

    const usernameExists = await this.findOne({ username })

    if (emailExists) {
        throw Error('Email already in use')
    }

    if (usernameExists) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt) //password encryption step

    const user = await this.create({ username, email, password: hash }) //creates user in database

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

userSchema.statics.checkBlocked = async (sender, receiver) => {
    sender = await User.findById(sender)
    receiver = await User.findById(receiver)
    isBlocked = await receiver.blockedList.includes(sender)
    hasBlocked = await sender.blockedList.includes(receiver)
    if( isBlocked || hasBlocked ){
        return true;
    }
    return false;
}

const User = mongoose.model('User', userSchema)

module.exports = User;