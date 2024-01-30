"use strict";

const { Client } = require("pg");
const config = require("./config");

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

module.exports = {
  async dbQuery(statement, ...parameters) {
    const client = new Client({
      host: config.POSTGRES_URL,
      port: config.POSTGRES_PORT,
      user: config.USER,
      database: config.POSTRES_DB_NAME,
    });

    await client.connect();
    logQuery(statement, parameters);
    let result = await client.query(statement, parameters);
    await client.end();

    return result;
  },
};
