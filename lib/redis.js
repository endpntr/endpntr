import { createClient } from "redis";

const client = await createClient()
  .on("error", (error) => console.log("Redis client error", error))
  .connect();

export default client;
