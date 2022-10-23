const express = require("express");

const javaRoutes = require("./modules/java/routes");
const pythonRoutes = require("./modules/python/routes");
const javascriptRoutes = require("./modules/javascript/routes");

const apiRouter = express.Router({ mergeParams: true });

apiRouter.use("/python", pythonRoutes()).use("/java", javaRoutes()).use("/javascript", javascriptRoutes());

module.exports = apiRouter;
