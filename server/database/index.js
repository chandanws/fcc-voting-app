const pgp = require("pg-promise")();

const connectionString = process.env.DATABASE_LOCAL;
const db = pgp(connectionString);

module.exports = { db, pgp };
