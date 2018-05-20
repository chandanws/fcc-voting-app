const pgp = require("pg-promise")();

const connectionString = process.env.DATABASE_urL;
const db = connection(connectionString);

module.exports = { db, pgp };
