const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    nickname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isVerified: {type: Boolean, default: false, required: true},
    createdAt: {type: Date, default: Date.now()}
});

export const User = model('User', UserSchema);