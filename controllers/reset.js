import { getUserByUsername } from "../model/User.model.js";

// this will redirect user on succesful OTP verification
export const createResetSession = async (req, res) => {
	if(req.app.locals.resetSession) {
		req.app.locals.resetSession = false // allow access to this route only once after OTP verification
		return res.status(201).send({ message: "Access Granted! "})
	}
	 return res.status(440).send({ error: "Session has expired." })
};

// put req
export const resetPassword = async (req, res) => {
	try {
		if(!req.app.locals.resetSession) {
			return res.status(440).send({ error: "Session Expired!" })
		}

		const { username, password } = req.body

		if(!username || !password) {
			return res.status(500).send({ message: "Please provide a username and password." })
		}

		const user = await getUserByUsername(username)
		

	} catch (error) {
		console.log(error)
		return res.status(401).send({ error })
	}
};