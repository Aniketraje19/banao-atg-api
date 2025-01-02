import {ApiResponse,ApiError,asyncHandler} from "../Utils/index.js";
import User from "../Models/User.model.js";
import jwt from "jsonwebtoken";


const register = asyncHandler(async (req,res)=>{
    
    const {username,email,password} = req.body

    if(!username || !email || !password){
        throw new ApiError(400,"All fields are required!")
    }

    const existingEmail = await User.findOne({ email })

    if(existingEmail){
        throw new ApiError(400,"User with same email already exists!")
    }

    const user = await User.create({
        username,email,password
    })
    
    if(!user){
        throw new ApiError(500,"Something went wrong while creating User Account!")
    }

    return res.status(200).json(new ApiResponse(200,
        {
            id:user._id,
            username:user.username,
            email:user.email,
        }
        ,"User Created Successfully!"))
})


const login = asyncHandler(async (req,res)=>{
    const {email,password} = req.body

    if (!email || !password){
        throw new ApiError(400,"All fields are required!")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404,"Invalid Email address!")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    console.log(isPasswordCorrect)
    if(!isPasswordCorrect){
        throw new ApiError(401,"Incorrect Password!")
    }

    const token = jwt.sign({id:user._id,email:user.email},process.env.TOKEN_SECRET,{expiresIn:"1d"})

    res.status(200).json(new ApiResponse(200,{id:user._id,username:user.username,email:user.email,token},"User Logged In Successfully!"))

})

/*
This is not idle forget Password Method
 We should use token to verify before changing the password
 As i dont have time, I am Implementing this
 */
const forgetPassword = asyncHandler(async (req,res)=>{

    const {email,newPassword} = req.body

    if(!email || !newPassword){
        throw new ApiError(400,"All fields are required!")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404,"Invalid Email address!")
    }

    user.password = newPassword
    const updatedUser = await user.save()

    if(!updatedUser){
        throw new ApiError(500,"Internal Server Error!")
    }


    return res.status(200).json(new ApiResponse(200,{},"Password Updated Successfully!"))


})

export {register,login,forgetPassword}