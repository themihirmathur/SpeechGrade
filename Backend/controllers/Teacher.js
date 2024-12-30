const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const logger = require('../logger/Logger')

const TeacherUser = require('../models/Teacher')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET)
}

const loginTeacher = async (req,res) => {
    const {Email, Password} = req.body

    try{
        const teacher = await TeacherUser.login(Email, Password)
        logger.info('Teacher Logged In!!!')
        const token = createToken(teacher._id)
        logger.info('Token Created!!!')
        return res.status(200).json({Email, token})
    }
    catch(error) {
        logger.error('error: ', error)
        return res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginTeacher
}