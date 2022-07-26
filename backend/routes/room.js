const express = require("express");

// Import articles controllers
const {
    createNewRoom
} = require("../controllers/discussion");

 

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Create books router
const roomRouter = express.Router();

 
roomRouter.post("/:id", authentication,authorization("ADD_ROOM"), createNewRoom);

 


module.exports = roomRouter;
