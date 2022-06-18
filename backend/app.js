import express from "express" ;
import cors from 'cors'
import connectDB from "./util/connectDB.js";
import {config} from "dotenv";
config() ;

const app = express() ;

import todoRoute from "./routes/todoRoute.js" ;
import userRoute from "./routes/userRoute.js";

const PORT = process.env.PORT ;
const DB_URL = process.env.DB_URL ;

// cors policy
app.use(cors())


// db connection
connectDB(DB_URL);

// json body
app.use(express.json())

// load routes
app.use('/api/user', userRoute)
app.use('/api/todo', todoRoute)


app.listen(PORT, ()=>{
    console.log("Server listening on http://localhost:8000") ; 
})

