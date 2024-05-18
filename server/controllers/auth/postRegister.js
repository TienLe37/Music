const User = require("../../models/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const postRegister = async(req, res) => {
    try {
        const {username, mail, password} = req.body

        //check if the user is already registered
        const userExists = await User.exists({mail: mail.toLowerCase()})
        
        if (userExists) {
            return res.status(409).send("Mail already exists")
        }
        
        // encrypt the password 
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user and save it to database
        const user = await User.create({
            username: username,
            mail: mail.toLowerCase(),
            password: encryptedPassword,
            role: 'member'
        })

        

        const token = jwt.sign(
            {
                userId: user._id,
                mail: user.mail.toLowerCase()
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h"
            }
        )
        
        //feedback client the user infomations
        return res.status(200).json({
            userDetails: {
                username: user.username,
                mail: user.mail,
                token: token,
                role: user.role,
                userId: user._id
            }
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
    

}

module.exports = postRegister