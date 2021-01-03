const exp = require("express");
const app = exp();

const redis = require("redis");

var redisClient = redis.createClient({
  host: "redis",
  port: 6379,
  retry_strategy: () => 1000,
});

redisClient.set("count", 0);

app.get("/", (req, res) => {
  redisClient.get("count", (err, count) => {
    res.send(`The count is ${count}`);
    redisClient.set("count", parseInt(count) + 1);
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
