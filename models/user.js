const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create User Schema & model
const UserSchema = new Schema({
    userID: {
        type: Number,
    },
    id: {
        type: Number
    },
    title: {
        type: String,
    },
    body:{
        type:String
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;