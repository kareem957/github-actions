const path = require('path');
const Router = require("express").Router();



module.exports = () => Router
    .get("/health", (req, res) => {
        console.log("Server is running.")
        res.status(200).sendFile(path.join(__dirname, 'static/index.html'))
    })
    .all('*', (req, res) => {
        res.status(404).send(`${req.path} doesn't exist. Please re-verify once.`);
    })