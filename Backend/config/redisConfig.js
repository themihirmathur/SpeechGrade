const redis = require('redis');
const logger = require('../logger/Logger')

let client;

const connectRedis = async () => {
    client = redis.createClient();

    client.on('connect', () => {
        logger.info('Connected to Redis...');
    });

    client.on('error', (err) => {
        logger.error('Redis error:', err);
    });

    await client.connect();
};

const getRedisClient = () => {
    if (!client) {
        throw new Error('Redis client is not connected');
    }
    return client;
};

module.exports = { connectRedis, getRedisClient };