const express = require("express");
const redis = require("redis");

const app = express();

const client = redis.createClient({
  host: "redis-server", // Service Name provided in the Docker Compose file
  port: 6379,
});

const port = process.env.PORT || 3000;

client.set("visits", 0);

app.get("/", (req, res) => {
  // process.exit(0);

  client.get("visits", (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(port, () => console.log(`Listening on PORT: ${port}`));
