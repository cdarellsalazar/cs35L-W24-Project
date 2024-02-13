//File containing schema for user objects, as well as signup and login methods for the users

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

//Establishes schema for a user object, contains an email and a password.
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    //validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword()) {
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

module.exports = mongoose.model('User', userSchema)