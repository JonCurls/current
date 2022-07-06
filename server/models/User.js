const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//mongoose User schema
const userSchema = new Schema()



const User = model('User', userSchema);

module.exports = User;