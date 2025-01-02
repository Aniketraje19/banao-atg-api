import { Router } from "express";
import {auth} from "../Middlewares/auth.middleware.js"
import { createPost,AllPosts,updatePost, deletePost, likePost, comment, getPostById} from "../Controllers/Post.controller.js";


const router = Router()

router.route("/")
.post(auth,createPost)
.get(AllPosts)

router.route("/:id")
.put(auth,updatePost)
.delete(auth,deletePost)
.get(getPostById)

router.route("/:id/like").post(auth,likePost)

router.route("/:id/comment").post(auth,comment)

export default router