import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    content: {
        type:String,
        required:true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    likes:[
        {type:mongoose.Schema.Types.ObjectId,ref:"User"}
    ],
    comments:[
        {
            user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
            text:{type:String,required:true},
            createdAt:{type:Date,default:Date.now}
        }
    ]
},{timestamps:true})

const Post = mongoose.model("Post",PostSchema)

export default Post;