const {Schema} = require('mongoose');

export const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, max:50},
    role: {type: String, required: true, max: 10},
    password: {type: String, required: true},
    status: {type: String, required: false},
    created: {type: Date, required: true, default: Date.now()},
})