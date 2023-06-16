import bcrypt from "bcrypt"
import UserModel from '../model/User.model.js'
import { authentication } from "../helpers/hash.js";
import { getUserByUsername } from "../model/User.model.js";

// this will redirect user on succesful OTP verification
export const createResetSession = async (req, res) => {
	if (req.app.locals.resetSession) {
		req.app.locals.resetSession = false; // allow access to this route only once after OTP verification
		return res.status(201).send({ message: "Access Granted! " });
	}
	return res.status(440).send({ error: "Session has expired." });
};

// put req
export async function resetPassword(req,res){
    try {
        
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

        const { username, password } = req.body;

        try {
            
            UserModel.findOne({ username})
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username : user.username },
                            { password: hashedPassword}, function(err, data){
                                if(err) throw err;
                                req.app.locals.resetSession = false; // reset session
                                return res.status(201).send({ message : "Record Updated...!"})								
                            });
                        })
                        .catch( e => {
                            return res.status(500).send({
                                error : "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error : "Username not Found"});
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}
