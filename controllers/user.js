import mongoose from "mongoose";
import { getUserByUsername, updateUserById } from "../model/User.model.js";

export const verifyUser = async (req, res, next) => {
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check if the user exist
        let exist = await getUserByUsername(username)
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}

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
		// const id = req.query.id
		// this property user is created when the isAuthorized func runs
        // then its accessible in the updateUser function
		const { userId } = req.user
		const body = req.body

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).send({ message: "Invalid ID" });
		  }

		if(!body) {
			return res.status(400).send({ message: "Data Required"})
		}

		const user = await updateUserById(userId, body)

		return res.status(200).send({ message: "User Updated", data: user })

 	} catch (error) {
		console.log(error)
	}
};
