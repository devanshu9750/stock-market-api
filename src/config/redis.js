const { createClient } = require('redis');

let redisClient = null;

const connectRedis = async () => {
  if (!redisClient) {
    try {
      redisClient = createClient({url: process.env.REDIS_URL});
      redisClient.on('error', (err) => console.error('❌ Redis Error:', err));
      await redisClient.connect();
      console.log('✅ Redis Connected Successfully');
    } catch (err) {
      console.error('❌ Redis Connection Error:', err);
      throw new Error('Redis connection failed');
    }
  }
}

const getRedisClient = () => redisClient;

module.exports = { getRedisClient, connectRedis };
