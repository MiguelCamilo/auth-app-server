import crypto from "crypto"

export const authentication = (salt, password) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).digest('hex')
}

export const random = () => crypto.randomBytes(128).toString('base64')