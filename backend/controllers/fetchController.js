/*

userSchema.statics.getParticipants = async function (conversationID, userID) {

    const Conversation = mongoose.model('Conversation')

    const conversation = await Conversation.findById(conversationID).populate('participants')

    const otherParticipants = conversation.participants.filter(participant => participant !== userID)

    return otherParticipants
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
}*/