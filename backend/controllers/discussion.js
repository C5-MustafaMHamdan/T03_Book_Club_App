const connection = require("../models/db");

const createNewRoom = (req, res) => {
  const book_id = req.params.id;
  const { description } = req.body;
  user_id = req.token.userId;
  const query = `SELECT * FROM books WHERE id = ? and is_deleted=0`;
  const data = [book_id];
  connection.query(query, data, (err, result) => {
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        massage: "not found",
      });
    }

    const query3 = `SELECT * FROM rooms WHERE  is_deleted=0`;
    const data = [book_id];

    connection.query(query3, data, (err, result) => {
      console.log(result);

      for (let index = 0; index < result.length; index++) {
        if (result[index].book_id == book_id) {
          return res.status(404).json({
            success: false,
            massage: "room already exist ",
          });
        }
      }

      const query2 = `insert into rooms (description,book_id,admin_id) values (?,?,?);`;
      const data2 = [description, book_id, user_id];
      connection.query(query2, data2, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            massage: "not ",
            err: err,
          });
        }
        return res.status(201).json({
          success: true,
          massage: "room created",
          result: result,
        });
      });
    });
  });
};

const getAllRoom = (req, res) => {
  const query = ` SELECT * FROM rooms INNER JOIN books ON rooms.book_id = books.id WHERE   rooms.is_deleted=0  `;
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
