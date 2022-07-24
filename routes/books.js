const express = require("express");

// Import articles controllers
const {
  getAllBooks,
  getBooksByAuthor,
  getBookById,
  AddNewBook,
   
  deleteBookById,
  deleteBookByAuthor,
} = require("../controllers/Books");

// Import comments controller
const { createNewComment } = require("./../controllers/discussion");

// Middleware
const authentication = require("../middleware/authentication");

// Create articles router
const booksRouter = express.Router();

/*
 * Testing Routes:
 * GET - POST ->  http://localhost:5000/books/
 * POST ->        http://localhost:5000/books/22/comments/
 * GET  ->        http://localhost:5000/books/search_1?author=2
 * GET  ->        http://localhost:5000/books/search_2?id=2
 * PUT  ->        http://localhost:5000/books/2
 * DELETE ->      http://localhost:5000/books/2
 * DELETE ->      http://localhost:5000/books
 */

/*
 * Testing Objects:
 

 *  Comment: {
    "comment":"wow",
    "commenter":"61d17b37d3a54990e227a549"
}
 */

booksRouter.get("/", getAllBooks);
booksRouter.get("/search_1", getBooksByAuthor);
booksRouter.get("/search_2", getBookById);
booksRouter.post("/",authentication, AddNewBook);
 
booksRouter.delete("/:id", deleteBookById);
booksRouter.delete("/", deleteBookByAuthor);

booksRouter.post(
  "/:id/comments",
  authentication,
  createNewComment
);

module.exports = booksRouter;
