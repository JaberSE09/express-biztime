/** BizTime express application. */
const express = require("express");
const app = express();
const ExpressError = require("./expressError");

// Parse request bodies for JSON
app.use(express.json());

const companiesRoute = require("./routes/companies");
app.use("/companies", companiesRoute);
const invoiceRoute = require("./routes/invoices");
app.use("/invoice", invoiceRoute);

/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass err to the next middleware
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on 3000");
});