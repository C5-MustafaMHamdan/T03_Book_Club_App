const express = require("express");

// Import articles controllers

const {
  viewList,
  getReadBookById,
  removefromList,
  addToList,
} = require("../controllers/reading-books");

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Create books router
const readRouter = express.Router();

readRouter.post("/:id", authentication, addToList);

readRouter.get("/", authentication, viewList);

readRouter.get("/:id", getReadBookById);

readRouter.put("/:id",authentication, removefromList);

module.exports = readRouter;
