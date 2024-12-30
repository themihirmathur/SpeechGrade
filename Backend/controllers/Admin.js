const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const logger = require('../logger/Logger')

const AdminUser = require('../models/Admin')
const TeacherUser = require('../models/Teacher')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '5d'})
}

const signupUser = async(req,res) => {
    const {Name, Email, Password} = req.body 
    console.log(Name);

    try {
        const admin = await AdminUser.signup(Name, Email, Password)
        logger.info('Teacher Created!!')
        const token = createToken(admin._id)
        logger.info('Token Generated!!')
        return res.status(200).json({Email, token})
    }
    catch(error) {
        logger.error(error)
        console.log(error);
        return res.status(400).json({error: error.message})
    }
}

const createTeacher = async(req,res) => {
    const {Name, Email, Password} = req.body 
    if(!Name || !Email || !Password) {
        return res.status(400).json({error: 'Please fill all the fields'})
    }

    try {

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(Password, salt)
        await TeacherUser.create({Name, Email, Password: hash})
        logger.info('Teacher Created!!')
        // const token = createToken(teacher._id)
        // logger.info('Token Generated!!')

        return res.status(200).json({Email})
    }
    catch(error) {
        logger.error(error)
        return res.status(400).json({error: error.message})
    }
}

const loginAdmin = async (req,res) => {
    const {Email, Password} = req.body

    try{
        const admin = await AdminUser.login(Email, Password)
        logger.info('Admin Logged In!!!')
        const token = createToken(admin._id)
        logger.info('Token Created!!!')
        return res.status(200).json({success: true, Email, token})
    }
    catch(error) {
        logger.error('error: ', error)
        return res.status(400).json({ success: false, error: error.message})
    }
}

module.exports = {
    createTeacher,
    signupUser,
    loginAdmin
}