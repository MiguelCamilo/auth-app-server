import { getUserByUsername } from "../model/User.model.js";
import jwt from "jsonwebtoken"

/* post request

    * @param: {
        "username": "",
        "password": ""
    }

*/
export const login = async (req, res) => {
	const { username, password } = req.body 

    if(!email || !password) {
        res.status(500).send({ message: "Please provide an email and password" })
    }
    
    const existingUser = await getUserByUsername(username)
    if(!existingUser) {
        return res.status(400).send({ message: "Email is already in taken." })
    }

};