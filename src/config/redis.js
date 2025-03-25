const { createClient } = require('redis');

let redisClient = null;

const connectRedis = async () => {
  if (!redisClient) {
    redisClient = createClient();
    redisClient.on('error', (err) => console.error('❌ Redis Error:', err));
    await redisClient.connect();
    console.log('✅ Redis Connected Successfully');
  }
}

const getRedisClient = () => redisClient;

module.exports = { getRedisClient, connectRedis };
