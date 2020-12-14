const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    dateofbirth:{
        type: Date,
        required:true
    }
});

module.exports = Profile = mongoose.model('profile',ProfileSchema);