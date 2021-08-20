const mongoose = require('mongoose');
const validator = require('validator');
// this is a employee model 
const submitdemoSchema = new mongoose.Schema({
    Firstname : {
        type: String,
        required:true
    },
    Lastname: {
        type: String,
        required: true
    },
    Email: {
        type:String,
        required: true,
        unique: [true, "email id taken"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        }
    },
    Company: {
        type: String,
        required:true
    },
    Companytype: {
        type: String,
        required: true
    },
    Phoneno: {
        type:Number,
        min:1000000000,
        max:9999999999,
        required: true,
        unique: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Industrytype: {
        type: String,
        required:true
    },
    Password: {
        type: String,
        required: true,
        unique: [true, "Password is already existed"]
    }
})

const SubmitDemo = new mongoose.model("SubmitDemo", submitdemoSchema);

module.exports = SubmitDemo;