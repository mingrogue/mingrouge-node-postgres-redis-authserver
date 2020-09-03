const redis    = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URL);
redisClient.on('ready',function() {
    console.log("Redis is ready");
});

redisClient.on('error',function() {
    console.log("Error in Redis");
});


module.exports = redisClient;