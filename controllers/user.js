// import UserModel from "../model/User.model.js"

export const getUser = async (req, res) => {
	res.json("getUser route");
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
	res.json("updateUser route");
};