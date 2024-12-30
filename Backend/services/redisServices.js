const { getRedisClient } = require('../config/redisConfig');
const logger = require('../logger/Logger'); 

const getCache = async (key) => {
    const client = getRedisClient();
    try {
        const data = await client.get(key);
        return data;
    } catch (err) {
        logger.info('Redis GET Error: ', err);
        throw err;
    }
};

const setCache = async (key, value, expiration = 3600) => {
    const client = getRedisClient();
    try {
        await client.setEx(key, expiration, JSON.stringify(value));
    } catch (err) {
        logger.info('Redis SET Error: ', err);
        throw err;
    }
};

const deleteCache = async (key) => {
    const client = getRedisClient();
    try {
        const response = await client.del(key);
        logger.info(`Cache deleted: ${key}`);
        return response;
    } catch (err) {
        logger.error('Error deleting cache:', err);
        throw err;
    }
};

module.exports = {
    getCache,
    setCache,
    deleteCache
};