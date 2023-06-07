import UserModel from "../model/User.model.js";

/* post request

    * @param: {
        "username": "",
        "password": ""
    }

*/
export const login = async (req, res) => {
	res.json("login route");
};