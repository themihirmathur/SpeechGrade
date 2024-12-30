const express = require("express");
const router = express.Router();
// const {
//     adminAuth
// } = require('../middlewares/adminAuth')
const {
    createTeacher,
    signupUser,
    loginAdmin
} = require("../controllers/Admin");

router.post("/createTeacher", createTeacher);
router.post('/signup', signupUser)
router.post('/login', loginAdmin)

module.exports = router;
