import UserModel from "../model/User.model.js";
import { authentication } from "../helpers/hash.js";
import { getUserByUsername } from "../model/User.model.js";

// this will redirect user on succesful OTP verification
export const createResetSession = async (req, res) => {
	if (req.app.locals.resetSession) {
		return res.status(201).send({ flag: req.app.locals.resetSession });
	}
	return res.status(440).send({ error: "Session expired!" });
};

// put req
export const resetPassword = async (req, res) => {
	try {
		if (!req.app.locals.resetSession) {
			return res.status(440).send({ error: "Session Expired!" });
		}

		const { username, password } = req.body;

		try {
			getUserByUsername(username).select("+authentication.password +authentication.salt")
				.then((user) => {
					// hashed incoming password
					let hashedPassword = authentication( user.authentication.salt, password );
					UserModel.findOneAndUpdate({ username: user.username }, { $set: { "authentication.password": hashedPassword } }, { new: true })
						.then((updatedUser) => {						
							req.app.locals.resetSession = false; // reset session
							return res.status(201).send({ message: "Record Updated...!" });
						})
						.catch((error) => {
							console.log(error);
							return res.status(500).send({ error });
						});
				});
		} catch (error) {
			return res.status(500).send({ error });
		}
	} catch (error) {
		console.log(error);
		return res.status(401).send({ error });
	}
};
