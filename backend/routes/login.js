const express = require("express");

// Import login controller
const { login } = require("../controllers/users");

// Create login router
const loginRouter = express.Router();



loginRouter.post("/", login);

module.exports = loginRouter;
