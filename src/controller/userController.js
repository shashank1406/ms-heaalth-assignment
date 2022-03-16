const userModel = require('../model/userModel')
const validator = require('validator')
const jwt = require("jsonwebtoken")




const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

// -------------------- first api to create user ---------------------------------------------------------------------------

const createUser = async function (req, res) {
    try {
        let requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, Message: "Invalid request parameters, Please provide user details" })
            return
        }

        if (!(validator.isEmail(email.trim()))) {
            return res.status(400).send({ status: false, msg: 'enter valid email' })
        }

        const newUser = await userModel.create(requestBody);

        res.status(201).send({ status: true, message: `User registered successfully`, data: newUser });

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}




// -------------------- second  api to login user ---------------------------------------------------------------------------


const loginUser = async function (req, res) {
    try {
        let requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "request body is emptey" })
        }
        if (requestBody.email && requestBody.password) {

            // email id or password is valid or not check validation 

            let userDetail = await userModel.findOne({ email: requestBody.email });

            if (!userDetail) {
                return res.status(400).send({ status: true, msg: "Invalid user email" })
            }

            if (!userDetail.password == requestBody.password) {
                return res.status(400).send({ status: true, msg: "Invalid user password" })
            }

            // jwt token create and send back the user

            let payload = { _id: userDetail._id }

            let token = jwt.sign(payload, 'micro-shield')

            res.header('x-api-key', token);

            res.status(200).send({ status: true, data: " user  login successfull", token: { token } })

        } else {
            res.status(400).send({ status: false, msg: "must contain email and password" })
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


// -------------------- third  api to get user detail---------------------------------------------------------------------------



const getUserDetail = async function (req, res) {

    try {

        const user = await userModel.findById(req.params.userId)
        if (!user) {
            return res.status(404).send({ status: false, message: 'profile does not exist' })
        }
        return res.status(200).send({ status: true, message: 'user profile details', data: user })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}




// -------------------- fourth api to update user detail ---------------------------------------------------------------------------


const updateUserDetail = async function (req, res) {

    try {
        let requestBody = req.body
        let userId = req.params.userId
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, Message: "Invalid request parameters, Please provide user details" })
            return
        }

        const { userName, name, email, phone, password } = requestBody
        const userData = {}

        if (userName) {

            userData.userName = userName
        }
        if (name) {

            userData.name = name
        }

        if (email) {

            if (!(validator.isEmail(email.trim()))) {
                return res.status(400).send({ status: false, msg: 'enter valid email' })
            }
            userData.email = email

        }

        if (phone) {

            userData.phone = phone
        }

        if (password) {

            userData.password = password
        }

        if (dateOfBirth) {

            userData.dateOfBirth = dateOfBirth
        }
        if (specialization) {

            userData.specialization = specialization
        }
        if (pincode) {

            userData.pincode = pincode
        }
        if (state) {

            userData.state = state
        }

        if (city) {

            userData.city = city
        }

        const newUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true })

        res.status(200).send({ status: true, message: `updated sucessfully `, data: newUser });

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



// -------------------- five api to delete user detail ---------------------------------------------------------------------------

const deleteUser = async function (req, res) {

    try {

        const userId = req.params.userId

        let check = await userModel.findOne({ _id: userId, isDeleted: false })
        if (!check) {
            res.status(400).send({ status: true, message: "user dosnt exist or already deleted" });
        }

        const user = await userModel.findOneAndUpdate({ _id: userId, isDeleted: false }, { isDeleted: true }, { new: true })

        res.status(200).send({ status: true, message: `deleted sucessfully `, data: user });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


// -------------------- first api to create user ---------------------------------------------------------------------------

module.exports.createUser = createUser
module.exports.loginUser = loginUser
module.exports.getUserDetail = getUserDetail
module.exports.updateUserDetail = updateUserDetail
module.exports.deleteUser = deleteUser
