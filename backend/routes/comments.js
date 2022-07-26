const express = require("express");

// Import articles controllers

const {
  addComments,
  getComments,
  updateComments,
  deleteComments,
  getuserId,
} = require("../controllers/comments");

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Create books router
const commentRouter = express.Router();

commentRouter.post("/:id", authentication, addComments);

commentRouter.get("/:id", authentication, getComments);

commentRouter.get("/user/:id", authentication, getuserId);

commentRouter.put("/:id", authentication, updateComments);
commentRouter.delete("/:id", authentication, deleteComments);
module.exports = commentRouter;
