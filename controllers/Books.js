
const connection = require("../models/db");

// This function returns the
const getAllBooks = (req, res) => {
  const command = `SELECT * FROM books WHERE is_deleted=0 ;`;

  connection.query(command, (err, result) => {
    console.log(result);
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: "All books",
        rooms: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "No book Were added Yet",
      });
    }

    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }
  });
};

// This function returns book by its id
const getBookById = (req, res) => {
  const id = req.params.id;

  const command = `SELECT * FROM books WHERE id = ? AND is_deleted = 0 ;`;

  const data = [id];

  connection.query(command, data, (err, result) => {
    console.log(result);
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Server Error", err: err.message });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: "The book Is Not Found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "The book For The Specified Id",
        category: result[0],
      });
    }
  });
};

// This function creates new book
const AddNewBook = (req, res) => {
  const { Title, book_img } = req.body;

  const command = `INSERT INTO books (Title,book_img) VALUES (?,?) `;
  const data = [Title, book_img];
  connection.query(command, data, (err, result) => {
    console.log(result);
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Server Error", err: err });
    }

    res.status(201).json({
      success: true,
      message: "book is added ",
      book: result[0],
    });
  });
};

// This function deletes a specific article by its id
const deleteBookById = (req, res) => {
  const id = req.params.id;
  const command = `UPDATE books SET is_deleted = 1 where id = ? `;
  const data = [id];

  connection.query(command, data, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Server Error", err: err });
    }
    if (!result.affectedRows) {
      return res
        .status(404)
        .json({ success: false, message: "The Book Is Not Found" });
    }
    res.status(200).json({ success: true, message: "Book Deleted" });
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  AddNewBook,

  deleteBookById,
};
