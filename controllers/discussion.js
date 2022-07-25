const connection = require("../models/db");

const createNewRoom = (req, res) => {
  const { description } = req.body;

  const book_id = req.params.id;
  const admin_id = req.token.userId;

  const query = `SELECT * FROM books WHERE id=? `;
  const data = [book_id];

  connection.query(query, data, (err, result) => {
    if (result.length===0) {
      return res.status(404).json({
        success: false,
        massage: "Book is not found",
      });
    }
    const query2 = `INSERT INTO rooms (book_id ,admin_id,description) VALUES (?,?,?)`;
    const data2 = [book_id, admin_id,description];

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

/* const deleteRoomByIdForAdmin = (req, res) => {
  const id = req.params.id;
  const userId = req.token.userId;

  const command = `UPDATE rooms SET is_deleted = 1 where id = ?`;
  const data = [id, userId];

  connection.query(command, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }
    if (!result.affectedRows) {
      return res
        .status(404)
        .json({ success: false, message: "The Room Is Not Found" });
    }
    res.status(200).json({ success: true, message: "Room Deleted" });
  });
};
 */

module.exports = {
  createNewRoom,
};
