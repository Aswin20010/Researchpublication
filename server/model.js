const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Department : {
        type : String,
        required: true
    },
    Designation : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    UserName : {
        type : String,
        required : true
    },
    JoinYear : {
        type : Date,
        required : true
    }
},{collection:'User',versionKey: false},)

const User = mongoose.model("User",UserSchema);

module.exports = User;