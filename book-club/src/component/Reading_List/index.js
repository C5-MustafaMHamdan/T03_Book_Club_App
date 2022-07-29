import React, {  useEffect, useState } from "react";
import "./style.css";

import axios from "axios";

//===========================Redux====================================
import {
  setReadingList,
  removeFromReadingList,
} from "../Redux/reducers/reading";

import { useSelector, useDispatch } from "react-redux";

const ReadingList = () => {



  const dispatch = useDispatch();
  const { token, isLoggedIn, readingList } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,

      readingList: state.readingList.readingList,
    };
  });

  const [message, setMessage] = useState("");

  //===============================================================

  const getAllReadingBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/readinglist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
   
      if (res.data.success) {
        dispatch(setReadingList(res.data.result));
        setMessage("");
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================

  const removeFromReading = async (id) => {
      try {
      await axios.put(`http://localhost:5000/readinglist/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },{
        validateStatus: function (status) {
          return status < 500; 
        }});
     dispatch(removeFromReadingList(id));
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
 



  //=========================================================================

  useEffect(() => {
    getAllReadingBooks();
  }, []);

  //===============================================================



  return (
    <>
      <br />
      {readingList &&
        readingList.map((book, index) => (
          <div key={index} className="book">
            <div>{book.Title}</div>
            <div>
              {" "}
              <img src={book.book_img}></img>{" "}
            </div>
            <button
              className="delete"
              onClick={() =>{  removeFromReading(book.id)}}
            >
              X
            </button>
          </div>
        ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default ReadingList;
