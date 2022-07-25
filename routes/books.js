const express = require("express");

// Import articles controllers
const {
  getAllBooks,

  getBookById,
  AddNewBook,

  deleteBookById,
} = require("../controllers/Books");

 

// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// Create books router
const booksRouter = express.Router();

 
booksRouter.post("/", authentication,authorization("ADD_BOOK"), AddNewBook);

booksRouter.get("/", getAllBooks);

booksRouter.get("/:id", getBookById);


booksRouter.put("/:id", deleteBookById);



module.exports = booksRouter;
