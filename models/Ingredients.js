
const mongoose = require("mongoose")

const IngredientsSchema = new mongoose.Schema({

    name :{
        type:String,
        required:true,
        trim:true,
        unique: true,
    },

    quantity:{
        type:Number,
        required:true,
        min:0,
        default:0,
    },

    unit:{
        type:String,
        required:true,
        enum:['kg', 'g', 'liter', 'piece']
    },

    creditSystem:{
        type:Number,
        required:true,
    },

},{timestamps:true});



const Ingredients = mongoose.model("Ingredients",IngredientsSchema)

module.exports = Ingredients