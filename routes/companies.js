const express = require("express");
const router = new express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

/** Get companies all*/

router.get("/", async function (req, res, next) {
  const results = await db.query(`
    SELECT * FROM companies`);

  return res.json({ companies: results.rows });
});


router.get("/:name", async function (req, res, next) {

  const name = req.params.name
  const results = await db.query(`
    SELECT * FROM companies WHERE code = '${name}'`);
  return res.json({ company: results.rows });
});


module.exports = router;
