const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

//const {schema} = require('mongoose')

const UserSchema = new mongoose.Schema({
    token: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // dsignation: {
    //     type: String,
    //     required: true,
    // },
    role: {
        type: String,
        required: true,
        enum: ["admin", "deliverypartner","agent"],
        default: "user",
      }
      
}

);

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel;