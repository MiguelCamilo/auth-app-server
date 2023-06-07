import UserModel from "../model/User.model.js"
import bcrypt from "bcrypt"


// get req
export const generateOTP = async (req, res) => {
	res.json("generateOTP route");
};

// get req
export const verifyOTP = async (req, res) => {
	res.json("verifyOTP route");
};

// this will redirect user on succesful OTP verification
export const createResetSession = async (req, res) => {
	res.json("createResetSession route");
};

// put req
export const resetPassword = async (req, res) => {
	res.json("resetPassword route");
};