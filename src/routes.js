const express = require("express");

const pythonRoutes = require("./modules/python/routes");

const apiRouter = express.Router({ mergeParams: true });

apiRouter.use("/python", pythonRoutes());

module.exports = apiRouter;
