import {ApiResponse,ApiError,asyncHandler} from "../Utils/index.js";
import Post from "../Models/Post.model.js"

const createPost = asyncHandler(async (req,res)=>{
    const {content} = req.body

    if(!content){
        throw new ApiError(400,"Content is required to create Post!")
    }

    const post = await Post.create({
        content,author:req.user._id
    })

    return res.status(200).json(new ApiResponse(200,{post},"Post Created Succesfully!"))

})

const AllPosts = asyncHandler(async (req,res)=>{
    const posts = await Post.find().populate("author","username")
    return res.status(200).json(new ApiResponse(200,posts,"All Posts feteched successfully!"))
})

const getPostById = asyncHandler(async (req,res)=>{
    
    try{
        const post = await Post.findById(req.params.id).populate("author","username").populate("comments.user", "username")
        if(!post){
            throw new ApiError(404,"Post not found!")
        }
    
        return res.status(200).json(new ApiResponse(200,post,"Post feteched Successfully!"))
    }catch(err){
        throw new ApiError(404,"Invalid Post Id")
    }
    

})

const updatePost = asyncHandler(async (req,res)=>{

    const {content} = req.body

    if(!content){
        throw new ApiError(400,"Content is required!")
    }

    const post = await Post.findById(req.params.id)

    if(!post){
        throw new ApiError(404,"Post not found!")
    }

    if(post.author.toString() !== req.user._id.toString()){
        throw new ApiError(403,"Unauthorized to update this Post!")
    }

    post.content = content

    const updatedPost = await post.save()


    return res.status(200).json(new ApiResponse(200,updatedPost,"Post Updated Successfully!"))

})

const deletePost = asyncHandler(async (req,res)=>{

    
    const post = await Post.findById(req.params.id)
    if(!post){
        throw new ApiError(404,"Post not Found!")
    }
    
    if(post.author.toString() !== req.user._id.toString()){
        throw new ApiError(403,"Unauthorized to delete this Post!")
    }
    
    await Post.findByIdAndDelete(req.params.id);
    
    return res.status(200).json(new ApiResponse(200,{},"Post deleted Successfully!"))

})

const likePost = asyncHandler(async (req,res)=>{
    
    const post = await Post.findById(req.params.id)

    if(!post){
        throw new ApiError(404,"Post not Found!")
    }

    const index = post.likes.indexOf(req.user._id)

    if(index > -1){
        post.likes.splice(index,1)
    }
    else{
        post.likes.push(req.user._id)
    }

    const updatedPost = await post.save()

    if(!updatePost){
        throw new ApiError(500,"Internal Server Error!")
    }

    return res.status(200).json(new ApiResponse(200,{},"Like toggled Successfully!"))

})

const comment = asyncHandler(async (req,res)=>{
    
    const {text} = req.body

    if(!text){
        throw new ApiError(400,"text is required!")
    }

    const post = await Post.findById(req.params.id)
    if(!post){
        throw new ApiError(404,"Post not found!")
    }

    post.comments.push({user:req.user._id,text})

    const savedPost = post.save();

    if(!savedPost){
        throw new ApiError(500,"internal server error!")
    }

    return res.status(200).json(new ApiResponse(200,{},"Comment added Successfully!"))

})

export {createPost,AllPosts,updatePost,deletePost,likePost,comment,getPostById}