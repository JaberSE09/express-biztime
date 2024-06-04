const express = require("express");
const router = new express.Router();
const db = require("../db");
const ExpressError = require("../expressError");
const slugify = require("slugify");

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

router.post("/", async function (req, res, next) {
  try {
    let {name, description} = req.body;
    let code = slugify(name, {lower: true});

    const result = await db.query(
          `INSERT INTO companies (code, name, description) 
           VALUES ($1, $2, $3) 
           RETURNING code, name, description`,
        [code, name, description]);

    return res.status(201).json({"company": result.rows[0]});
  }

  catch (err) {
    return next(err);
  }
});
module.exports = router;
