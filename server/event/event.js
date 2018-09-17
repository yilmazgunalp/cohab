const mongoose = require('mongoose');
const config = require('../config/config');

const EventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    place: {type: String, required: true},
    startTime: {type: Date, required: true}, 
    description: {type: String, required: true}, 
    endTime: Date,
    ended: {type: Boolean,default: false},
    organizer: String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    isPrivate: Boolean
    });


const Event = mongoose.model('event',EventSchema);

module.exports = Event;

