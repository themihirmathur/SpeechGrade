const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/mongoConfig");
const morgan = require('morgan')
const helmet = require('helmet')

const { collectMetrics, metricsEndpoint } = require('./middlewares/Metrics');
const logger = require('./logger/Logger')

require("dotenv").config();

const adminRoutes = require('./routes/Admin')
const teacherRoutes = require('./routes/Teacher')

const app = express();
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(collectMetrics);
// const {
//     connectRedis
// } = require('./config/redisConfig') 
connectToDB();

// connectRedis()

app.use((req,res,next) => {
  logger.info(req.method, req.path)
  // console.log(req.method, req.path)
  next()
})

app.get("/", (req, res) => {
  logger.info('Server Healthy')
  res.status(200).json("Server Healthy !");
});

app.get('/metrics', metricsEndpoint);
app.use('/api/admin', adminRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/student', require('./routes/Student'))
app.use('/api/class', require('./routes/ClassRoom'))
app.use('/api/pastData', require('./routes/PastData'))

app.listen(process.env.PORT, () => {
  logger.info(`Server started on port ${process.env.PORT}`);
});
