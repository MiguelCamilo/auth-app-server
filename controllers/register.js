import UserModel from "../model/User.model.js"
import bcrypt from "bcrypt";

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

		// check if username is taken
		const existingUsername = new Promise((resolve, reject) => {
			UserModel.findOne({ username }, function (err, user) {
				if (err) reject(new Error(err));
				if (user) reject({ error: "Username already in use." });

				resolve();
			});
		});

		// check if email is taken
		const existingEmail = new Promise((resolve, reject) => {
			UserModel.findOne({ email }, function (err, email) {
				if (err) reject(new Error(err));
				if (email) reject({ error: "Email already in use." });

				resolve();
			});
		});

		Promise.all([existingUsername, existingEmail])
			.then(() => {
				if (password) {
					// hashesh password
					bcrypt
						.hash(password, 10)
						.then((hashedPassword) => {
							const user = new UserModel({
								username,
								password: hashedPassword,
								profile: profile || "",
								email,
							});

							// return and save response in db
							user
								.save()
								.then((result) =>
									res.status(201).send({ message: "User Registered" })
								)
								.catch((error) => res.status(500).send({ error }));
						})
						.catch((error) => {
							return res.status(500).send({
								error: "Enable to hashed password",
							});
						});
				}
			})
			.catch((error) => {
				return res.status(500).send({ message: "Promise Rejected" });
			});
            
	} catch (error) {
		return res.status(500).send(error);
	}
};
