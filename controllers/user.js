import { getUserByUsername } from "../model/User.model.js";

export const getUser = async (req, res) => {
	try {
		const { username } = req.params;

		if (!username) {
			return res.status(501).send({ error: "Invalid Username" });
		}

		const user = await getUserByUsername(username);
		if (!user) {
			return res.status(501).send({ error: "Unable to find the user" });
		}

		return res.status(201).send(user);
	} catch (error) {
		console.log(error);
		return res.status(403).send({ message: "Cannot find user data" });
	}
};

/* put request

* @param: {
    "header" : "<token>"
  }
  body: {
      firstName: '',
      address : '',
      profile : ''
  }
  */
export const updateUser = async (req, res) => {
	try {
		const { id } = req.query.id
		
 	} catch (error) {
		console.log(error)

	}
};
