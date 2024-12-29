import { Router } from "express";
import {register,login,forgetPassword} from "../Controllers/User.controller.js";

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/forget-password").post(forgetPassword)

export default router