const connection = require("../models/db");

//View List
const viewList = (req, res) => {
  const userId = req.token.userId;

  const query = ` SELECT * FROM reading_book INNER JOIN books ON reading_book.book_id = books.id WHERE user_id=?  AND reading_book.is_deleted=0  `;
  /* SELECT * FROM reading_book INNER JOIN books ON reading_book.book_id = books.id WHERE book_id = ?  */
  const data = [userId];

  connection.query(query, data, (err, result) => {
    console.log(result);
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: `list of reading`,
      result: result,
    });
  });
};

/* getReadBookById */

const getReadBookById = (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM reading_book INNER JOIN books ON reading_book.book_id = books.id WHERE book_id = ?   `;

  const data = [id];

  connection.query(query, data, (err, result) => {
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

//add Book from List depend on the login | token userId
const addToList = (req, res) => {
  const book_id = req.params.id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM books WHERE id=? AND is_deleted=0 `;
  const data = [book_id];

  connection.query(query, data, (err, result) => {
    if (!result) {
      return res.status(404).json({
        success: false,
        massage: "Book is not found",
      });
    }
    const query2 = `INSERT INTO reading_book (book_id ,user_id) VALUES (?,?)`;
    const data2 = [book_id, user_id];

    connection.query(query2, data2, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "Server error",
          err: err.message,
        });
      }
      return res.status(200).json({
        success: true,
        massage: `Book Added to List`,
        result: result,
      });
    });
  });
};

// Remove Book from List
const removefromList = (req, res) => {
  const user_id = req.token.userId;
  const book_id = req.params.id;

  const query = `UPDATE reading_book SET is_deleted = 1 where book_id = ? AND user_id = ? `;
  const data = [book_id, user_id];

  connection.query(query, data, (error, result) => {
    if (error) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: error.message,
      });
    } else {
      return res.status(200).json({
        success: true,
        massage: `Book is removed `,
        result: result,
      });
    }
  });
};

module.exports = {
  viewList,
  removefromList,
  addToList,
  getReadBookById,
};
