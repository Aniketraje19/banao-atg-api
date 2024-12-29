import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = mongoose.Schema({
    username: {
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        unique:true,
        required:true,
    }

},{timestamps:true})


UserSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})


UserSchema.methods.isPasswordCorrect = async function (password){
    console.log(password,this.password)
    return await bcrypt.compare(password,this.password)
}

const User = mongoose.model("User",UserSchema);

export default User;