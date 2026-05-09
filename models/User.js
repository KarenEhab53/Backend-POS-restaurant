const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:String,
    email:{
         type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate: {

        validator: function(value) {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            return emailRegex.test(value);

        },

        
        message: props => `${props.value} is not a valid email address!`

    }
    },
    password:{
        type: String,
        required:true,
        select:false
    },
    role:{
        type:String,
        enum:["cashier","admin"],
        default: "cashier"
    }

})

module.exports = mongoose.model("User",userSchema)