const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const { default: mongoose } = require("mongoose");
const dotenv= require("dotenv")
const cors = require("cors")

const notFound= require("./middleware/not-found")
const port =5000;

// for java script port 3000
// const port =3000;


app.use(cors())
//middleware
app.use(express.static("./public"))
app.use(express.json())

dotenv.config()

//MongoDB connection
const connectDB = async()=>{
     try{
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("server is connected to database")
     }catch(err){
        console.log("server is not connected to database")
     }
}
connectDB()

//routes
app.use("/api/v1/tasks",tasks)
app.use(notFound)
app.listen(port,console.log(`server is listening on port ${port}`))