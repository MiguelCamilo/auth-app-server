import jwt from "jsonwebtoken"
import ENV from "../env.config.js"

// auth middle ware
export const isAuthorized = async (req, res, next) => {
    try {
        // access authorized header to validate req
        const token = req.headers.authorization.split(" ")[1] // split seperates the bearer word from the token

        if(!token) {
            return res.sendStatus(403)
        }

        // retrieve user details from the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET)

        // this property user is created when the isAuthorized func runs
        // then its accessible in the updateUser function
        req.user = decodedToken

        next()

    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Authentication Failed" })
    }
}


export const localVariables = (req, res, next) => {
    // access to the apps local vars
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next()
}