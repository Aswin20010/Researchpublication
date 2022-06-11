const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    Email : {
        type : String,
        required: true
    },
    Password : {
        type : String,
        required : true
    }
},{collection:'Authentication',versionKey: false})

AuthSchema.methods.matchPassword = async (password) =>{
    return password == this.Password;
} 
const Auth = mongoose.model("Authentication",AuthSchema);

module.exports = Auth;