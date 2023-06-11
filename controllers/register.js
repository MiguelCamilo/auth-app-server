import { random, authentication } from "../helpers/hash.js";
import { createUser, getUserByEmail, getUserByUsername } from "../model/User.model.js";

/* post request with created user object data
* @param : {
    "username" : "example123",
    "password" : "admin123",
    "email": "example@gmail.com",
    "firstName" : "bill",
    "lastName": "william",
    "phoneNumber": 8009860560,
    "profile": ""
  }
*/
export const register = async (req, res) => {
	try {
		const { username, password, profile, email } = req.body;

		const existingUsername = await getUserByUsername(username)
		if(existingUsername) {
			return res.status(403).send({ message: "Username is taken."})
		}

		const existingEmail = await getUserByEmail(email)
		if(existingEmail) {
			return res.status(403).send({ message: "Email is taken."})
		}

		const salt = random()
		const user = await createUser({
			email,
			authentication: {
				salt,
				password: authentication(salt, password),
			},
			profile: profile || '',
			username
		})

		return res.status(201).send({ message: "User Registered Succesfully.", user })
            
	} catch (error) {
		console.log(error)
		return res.status(500).send(error);
	}
};