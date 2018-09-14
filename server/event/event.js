const mongoose = require('mongoose');
const config = require('../config/config');

const EventSchema = new mongoose.Schema({
    name: {type: String},
    place: String,
    startTime: Date,
    endTime: Date,
    ended: {type: Boolean,default: false},
    organizer: String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
    });


const Event = mongoose.model('event',EventSchema);

module.exports = Event;

