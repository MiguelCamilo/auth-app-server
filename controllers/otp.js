import otpGenerator from "otp-generator"

// get req to generate OTP
export const generateOTP = async (req, res) => {
	// OTP can be accessed from the localVariables func in the middleware
	req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false } ) // lenght of otp
	
	// response sends the generated OTP
	res.status(201).send({ code: req.app.locals.OTP })
};


// get req
export const verifyOTP = async (req, res) => {
	const { code } = req.query
	if(parseInt(req.app.locals.OTP) === parseInt(code)) {
		// this makes the OTP value only usable once
		req.app.locals.OTP = null // resets the OTP value
		req.app.locals.resetSession = true // starts session to reset the password

		return res.status(201).send({ message: "Verified Succesfully! "})
	}
	return res.status(400).send({ error: "Invalid OTP."})
	
};