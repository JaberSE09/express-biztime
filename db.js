/** Database setup for BizTime. */

const { Client } = require("pg");

const DB_URI = "postgres:///biztime";

let db = new Client({
  user:"sajid" ,
  password: "root",
  database: "biztime",
});

db.connect();

module.exports = db;