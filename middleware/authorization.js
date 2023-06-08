import jwt from "jsonwebtoken"
import pkg from 'lodash';
const { get, merge } = pkg;

import ENV from "../env.config.js"

export const isOwner = async (req, res, next) => {
    try {
        const { id } = req.query.id

        //  object containing information about the current HTTP request, 
        // and identity._id is a nested property of that object.
        const  currentUserId = get(req, 'identity._id')

        if(!currentUserId) {
            return res.status(403)
        }

        if(currentUserId.toString() !== id) {
            return res.status(403).send({ error: "Not Authorized to complete this request."})
        }

         next()

    } catch (error) {
        console.log(error)
    }
}

// auth middle ware
export const isAuthorized = async (req, res, next) => {
    try {
        // access authorized header to validate req
        const token = req.headers.authorization.split(" ")[1] // split seperates the bearer word from the token

        // retrieve user details from the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET)

        // this property user is created when the isAuthorized func runs
        // then its accessible in the updateUser function
        req.user = decodedToken

        return next()

    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Authentication Failed" })
    }
}