const User = require("../../models/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const postLogin = async(req, res) => {
    try {
    const {mail, password} = req.body
    
    //check if user already exists
    const user = await User.findOne({mail: mail.toLowerCase()})

    console.log(user)

    //check if password is correct 
    if (user && (await bcrypt.compare(password, user.password))) {
        //send new token
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

        return res.status(200).json({
                mail: user.mail,
                token: token,
                username: user.username,
                id: user._id
        })
    }
    return res.status(400).json("Cannot find user")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = postLogin