
import connectDB from "./DB/index.db.js";
import { config } from "dotenv";
import app from "./app.js";


config({
    path:"./.env"
})

const PORT = process.env.PORT || 5000

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Started on PORT : ${PORT}`);
    })
})
.catch(error => console.log(`MONGODB Connection Failed! : ${error}`))