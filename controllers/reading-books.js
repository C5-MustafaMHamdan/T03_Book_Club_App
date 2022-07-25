const connection = require("../models/db");

//View List
const viewList = (req, res) => {
  const userId = req.token.userId;

  const query = ` SELECT * FROM reading_book WHERE user_id=? AND is_deleted=0  `;

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

//add Book from List depend on the login | token userId
const addToList = (req, res) => {
  const book_id = req.params.id;
  const user_id = req.token.userId;

  const query = `SELECT * FROM books WHERE id=? `;
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

  const query = `UPDATE reading_book SET is_deleted=1 
    WHERE user_id=? AND book_id=?;`;
  const data = [user_id, book_id];

  connection.query(query, data, (error, result) => {
    console.log(error);
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
};
