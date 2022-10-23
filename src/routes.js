const express = require("express");

const pythonRoutes = require("./modules/python/routes");
const javascriptRoutes = require("./modules/javascript/routes");

const apiRouter = express.Router({ mergeParams: true });

apiRouter.use("/python", pythonRoutes()).use("/java", javascriptRoutes()).use("/javascript", javascriptRoutes());

module.exports = apiRouter;
