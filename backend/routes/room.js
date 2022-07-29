const express = require("express");

// Import articles controllers
const {
  createNewRoom,
  getAllRoom,
  getRoomById,
  deleteRoomById,
} = require("../controllers/discussion");

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Create books router
const roomRouter = express.Router();

roomRouter.post(
  "/:id",
  authentication,
  authorization("ADD_ROOM"),
  createNewRoom
);
roomRouter.get("/", authentication, getAllRoom);
roomRouter.get("/:id", authentication, getRoomById);
roomRouter.put(
  "/:id",
  authentication,
  authorization("DELETE_ROOM"),
  deleteRoomById
);

module.exports = roomRouter;
