const express = require("express")
const app = express()
require("dotenv").config()

app.use(express.json())
const mongoose = require("mongoose")    




async function dbConnection(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connected successfully")
    }catch(err){
        console.log("server error")
    }
}
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

dbConnection();

const port = process.env.PORT || 3000

app.listen(port,()=> console.log("server running"))