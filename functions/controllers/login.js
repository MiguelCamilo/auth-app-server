import jwt from "jsonwebtoken";

import { getUserByUsername } from "../model/User.model.js";
import { authentication } from "../helpers/hash.js";
import ENV from "../env.config.js"

/* post request

    * @param: {
        "username": "",
        "password": ""
    }

*/
export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(500).send({ message: "Please provide a username and password." });
		}

		const user = await getUserByUsername(username).select('+authentication.password +authentication.salt');
		if (!user) {
			return res.status(400).send({ message: "Username not found." });
		}

		const token = jwt.sign(
			{
				userId: user._id,
				username: user.username,
			},
			ENV.JWT_SECRET,
			{ expiresIn: "24h" }
		);

		// compare hashed password to user password
        // here we send back the user with a salt and the password and it returns 
        // an encrypted string 
		let expectedHash = authentication(user.authentication.salt, password);

		if (user.authentication.password !== expectedHash) {
			return res.status(403).send({ message: "Invalid Credentials " });
		}

		return res.status(200).send({
			message: "Login Successful!",
			username: user.username,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).send({ message: "An error occurred." });
	}
};
