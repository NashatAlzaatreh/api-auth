"use strict";

function logger(req, res, next) {
  console.log("REQUEST: ", " method: ", req.method, " , path: ", req.path);

  next();
}

module.exports = logger;
