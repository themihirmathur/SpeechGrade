const jwt = require("jsonwebtoken");
const AdminUser = require("../models/Admin");
const logger = require('../logger/Logger');
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  logger.error('JWT_SECRET is not defined');
  throw new Error('JWT_SECRET is not defined');
}

const adminAuth = async (req, res, next) => {
  logger.info('Fetching Token....');
  const token = req.header("token");

  if (!token) {
    logger.error("No token provided");
    return res.status(401).send({ error: "Invalid Token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    logger.info('Token verified:', data);
    
    logger.info('Finding admin by Id...');
    const admin = await AdminUser.findById(data._id);

    if (!admin) {
      logger.error('Admin not found with provided token');
      return res.status(401).json({ error: "Invalid Token" });
    }

    req.admin = admin;
    logger.info('Admin authenticated:', admin);
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

module.exports = adminAuth;
