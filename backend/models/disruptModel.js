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

const Disrupt = mongoose.model('Disrupt', disruptSchema)

module.exports = Disrupt;