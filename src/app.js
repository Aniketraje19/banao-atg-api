import express from "express"
import cors from "cors"
import ErrorMiddleware from "./Middlewares/error.middleware.js"

import UserRouter from "./Routes/User.routes.js"
import PostRouter from "./Routes/Post.routes.js"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path"; 

const __filename = fileURLToPath(import.meta.url); // Get current file URL
const __dirname = dirname(__filename); // Get the directory name
const app = express();


app.use(cors({
    origin:"*",
    credentials:true,
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))


app.all("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
})



app.use("/api/v1/user",UserRouter)
app.use("/api/v1/posts",PostRouter)

app.use(ErrorMiddleware)

export default app;