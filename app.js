const express = require("express")
const app = express()
require("dotenv").config()

app.use(express.json())
const mongoose = require("mongoose")    




async function dbConnection(){
    try{
        await mongoose.connect(
          process.env.DB_URL || "mongodb://127.0.0.1:27017/POS-restaurant",
        );
        console.log("DB connected successfully")
    }catch(err){
        console.log("server error")
    }
}
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);
const categoryRoutes=require('./routes/CategoryRoutes')
app.use('/api',categoryRoutes)

dbConnection();

const port = process.env.PORT || 3000

app.listen(port,()=> console.log("server running"))