import { Router } from "express";

const router = Router()

// import controllers
import * as controller from "../controllers/controller.js"
import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js"
import { getUser, updateUser } from "../controllers/user.js"

// POST 
// router.route('/registerMail').post() // sends email
router.route('/authenticate').post((req,res) => res.end())
router.route('/register').post(register)
router.route('/login').post(login)

// GET 
router.route('/user/:username').get(getUser)
router.route('/generateOTP').get(controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)


// PUT
router.route('/updateUser').put(updateUser)
router.route('/resetPassword').put(controller.resetPassword)

export default router