import { Router } from "express";

const router = Router()

// import controllers
import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js"
import { generateOTP, verifyOTP } from "../controllers/otp.js";
import { getUser, updateUser, verifyUser } from "../controllers/user.js"
import { resetPassword, createResetSession } from "../controllers/reset.js";

// import middleware
import { isAuthorized, localVariables } from "../middleware/authorization.js";

// POST 
// router.route('/registerMail').post() // sends email
router.route('/authenticate').post((req,res) => res.end())
router.route('/register').post(register)
router.route('/login').post(verifyUser, login)

// GET 
router.route('/user/:username').get(getUser)
router.route('/generateOTP').get(verifyUser, localVariables, generateOTP) //! http://localhost:8080/api/generateOTP?username=example123
router.route('/verifyOTP').get(verifyOTP)
router.route('/createResetSession').get(createResetSession)


// PUT
router.route('/updateuser').put(isAuthorized, updateUser)
router.route('/resetpassword').put(verifyUser, resetPassword)

export default router