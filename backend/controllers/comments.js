const connection = require("../models/db");



const addComments = (req, res) => {
    const room_id = req.params.id
    const { comment } = req.body;
    const user_id = req.token.userId
    const query =
        "INSERT INTO comments (room_id ,user_id , comment) VALUES (? , ? , ?);";
    const data = [room_id, user_id, comment];

    connection.query(query, data, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                message: "Server Error",
                err: err,
            });
        }

        res.json({
            success: true,
            message: "add addcomments successufuly",
            result: result,
        });
    });
};




const getComments = (req, res) => {
    const  room_id  = req.params.id

    const query = "SELECT  comments.id , users.username ,comments.comment, comments.user_id  FROM comments INNER JOIN users ON comments.user_id=users.id WHERE comments.is_deleted=0 AND comments.room_id=?";

    const data = [room_id]
    connection.query(query, data, (err, result) => {
        console.log(result);
        if (err) {
            res.json({
                sucsess: false,
                messege: "Server Error",
                err: err,
            });
        }
        res.json({
            success: true,
            message: "All the comments",
            result: result,

        });
    });
};



const updateComments = (req, res) => {
    const { comment, id } = req.body;
    const user_id = req.token.userId
    const query = "UPDATE comments SET comment=? WHERE id = ? AND is_deleted=0 AND user_id=?";
    const data = [comment, id, user_id];
    connection.query(query, data, (err, result) => {
        if (err) {
            res.json({
                success: false,
                message: "Server Error",
                err: err,
            });
        }
        res.status(200).json({
            success: true,
            message: "comment updated",
            result: result,
        });
    });
};
const deleteComments = (req, res) => {
    const { id } = req.params;
    const user_id = req.token.userId
    const query = "UPDATE comments SET is_deleted=1 WHERE id = ? AND user_id=?;";
    const data = [id, user_id];
    connection.query(query, data, (err, result) => {
        if (err) {
            res.json({
                success: false,
                message: "Server Error",
                err: err,
            });
        }
        res.json({
            success: true,
            message: "comment deleted",
            result: result,
            user_id: user_id
        });
    });
};

const getuserId = (req, res) => {
    const user_id = req.token.userId;
    res.json({ user_id })
}


module.exports = {
    addComments,
    getComments,
    updateComments,
    deleteComments, 
    getuserId
};