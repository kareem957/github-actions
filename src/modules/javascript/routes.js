const Router = require("express").Router();
const controller = require("./controller");

module.exports = () => {
    Router.route("/").post(controller?.compileJavascript);

    Router.route("/withInput").post(controller?.compileJavascriptWithInput);

    return Router;
};
