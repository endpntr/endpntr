const { createClient } = require("redis");
const RedisStore = require("connect-redis").default;

let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "endpntr:",
});

module.exports = redisStore;
