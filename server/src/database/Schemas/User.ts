const {Schema, model} = require('mongoose');

// @ts-ignore
const User = new Schema({
    email: String,
    password: String,
})

module.exports = model('User', User);

