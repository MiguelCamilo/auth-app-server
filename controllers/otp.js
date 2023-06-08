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
};