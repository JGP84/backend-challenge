"use strict";
const Pool = require("pg").Pool;
require("dotenv").config();
// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   port: process.env.PG_PORT,
// };
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const proConfig = process.env.DATABASE_URL; //heroku addons
const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,
    ssl: { rejectUnauthorized: false } /* recomendation STACK OVERFLOW https://stackoverflow.com/questions/63009221/at-error-code-h12-desc-request-timeout-in-node-js-how-to-deal-with-it */
});
module.exports = pool;
//# sourceMappingURL=db.js.map