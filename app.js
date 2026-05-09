require("dotenv").config()
const express = require("express")
const app = express()
const cors = require ('cors')

app.use(cors({
      origin: 'http://localhost:5173',
      Credential: true

}))

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
dbConnection();
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const IngredientsRouter = require("./routes/IngredientsRouter")
app.use("/api/ingredients",IngredientsRouter)


const port = process.env.PORT || 3000

app.listen(port,()=> console.log("server running"))