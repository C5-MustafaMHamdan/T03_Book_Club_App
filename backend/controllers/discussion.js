const connection = require("../models/db");

const createNewRoom = (req, res) => {
  const { description } = req.body;

  const book_id = req.params.id;
  const admin_id = req.token.userId;

  const query = `SELECT * FROM books WHERE id=? `;
  const data = [book_id];

  connection.query(query, data, (err, result) => {
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        massage: "Book is not found",
      });
    }
    const query2 = `INSERT INTO rooms (book_id ,admin_id,description) VALUES (?,?,?)`;
    const data2 = [book_id, admin_id, description];

    connection.query(query2, data2, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: `Server Error`, err: err.message });
      }
      res.status(201).json({
        success: true,
        message: "Room created",
        room: result,
      });
    });
  });
};

const getAllRoom = (req, res) => {
  const query = `select * from rooms where is_deleted=0; `;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: "not found",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the rooms",
      result: result,
    });
  });
};

const getRoomById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM rooms WHERE id = ? and is_deleted=0`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.length) {
      return res.status(404).json({
        success: false,
        massage: "The boods is Not found",
      });
    }
    res.status(200).json({
      success: true,
      massage: `the books ${id}`,
      result: result,
    });
  });
};

const deleteRoomById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE rooms SET is_deleted=1 WHERE id=?;`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The books ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete books with id : ${id}`,
      result: result,
    });
  });
};

module.exports = {
  createNewRoom,
  getAllRoom,
  getRoomById,
  deleteRoomById,
};
