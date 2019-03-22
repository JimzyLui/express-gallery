// Update with your config settings.
require("dotenv").config();
// console.log(process.env);
// require('dotenv').config({path: '.'});

module.exports = {
  client: "pg",
  connection: {
    // comment out host when directly accessing db via knex
    // host: process.env.POSTGRES_HOSTNAME,
    // port: process.env.POSTGRES_HOST_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  },
  seeds: {
    directory: "./resources/database/seeds"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: "./resources/database/migrations",
    tableName: "knex_migrations"
  }
};
