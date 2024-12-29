import jwt from "jsonwebtoken"
import User from "../Models/User.model.js"
import { ApiError, asyncHandler } from "../Utils/index.js"


export const auth = asyncHandler( async (req,res,next)=>{
    let token;

    if(req.headers.authorization?.startsWith("Bearer")){
        
        try{
            token = req.headers.authorization.split(" ")[1]

            const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)


            const user = await User.findById(decodedToken.id).select("-password");

            if(!user){
                throw new ApiError(401,"User not Found!")
            }

            req.user = user
            
            next()
        }
        catch(err){
            throw new ApiError(401,"Unauthorized Access!")
        }

    }

    if(!token){
        throw new ApiError(401,"Unauthorized Access!")
    }

})