var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    telegramUser: {
        type: Object,
        required: true
    },
    telegramChat: Object,
    timeDateMessageId: String,
    created: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('User', userSchema);