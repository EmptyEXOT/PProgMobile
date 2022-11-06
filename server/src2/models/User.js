const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    nickname: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    createdAt: {type: Date, default: Date.now()},
});

module.exports = model('User', UserSchema);