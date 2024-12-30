const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')
const { match } = require('assert')
const { exists } = require('fs')

const Schema = mongoose.Schema

const teacherSchema = new Schema({
    Name : {
        type: String,
        required: true
    },
    Email : {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
        minlength: 8
    },
    ClassId: {
        type: mongoose.Schema.Types.ObjectId,
    }
})

teacherSchema.statics.login = async function(Email, Password) {
    if(!Email || !Password) {
        throw Error('All fields must be filled.')
    }

    const user = await this.findOne({Email})

    if(!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(Password, user.Password)

    if(!match) {
        throw Error('Incorrect Password, please provide valid credentials.')
    }

    return user
}

module.exports = mongoose.model('TeacherUser', teacherSchema)