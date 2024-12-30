const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");
const logger = require('../logger/Logger');  // Assuming logger is correctly configured and available
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  logger.error('JWT_SECRET is not defined');
  throw new Error('JWT_SECRET is not defined');
}

const teacherAuth = async (req, res, next) => {
  logger.info('Fetching Token....');
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    logger.error("No token provided");
    return res.status(401).send({ error: "Invalid Token" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, JWT_SECRET);
    logger.info('Token verified:', data);
    
    logger.info('Finding teacher by Id...');
    const teacher = await Teacher.findById(data._id);

    if (!teacher) {
      logger.error('Teacher not found with provided token');
      return res.status(401).json({ error: "Invalid Token" });
    }

    req.teacher = teacher;
    logger.info('Teacher authenticated:', teacher);
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      logger.error('Invalid Token:', error.message);
      return res.status(401).json({ error: "Invalid Token" });
    } else {
      logger.error('Authentication error:', error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};


module.exports = teacherAuth;
