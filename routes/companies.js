const express = require("express");
const router = new express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

/** Get companies */

router.get("/", async function  (req, res, next) {
  const results = await db.query(`
    SELECT * FROM companies`);

  return res.json(results.rows);
});

module.exports = router;
