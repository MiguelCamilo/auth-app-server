import { Router } from "express";

const router = Router()

// import controllers
import * as controller from "../controllers/controller.js"
import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js"
import { getUser, updateUser } from "../controllers/user.js"

// import middleware
import { isOwner } from "../middleware/authorization.js";
import { isAuthorized } from "../middleware/authorization.js";

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
router.route('/updateuser').put(isAuthorized, updateUser)
router.route('/resetpassword').put(controller.resetPassword)

export default router