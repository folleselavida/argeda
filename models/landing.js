var mongoose = require('mongoose');

var landingSchema = mongoose.Schema({

    name: { type: String, default: '' },
    email: { type: String, lowercase: true, trim: true, index: { unique: true } } 

});

module.exports = mongoose.model('Landing', landingSchema);