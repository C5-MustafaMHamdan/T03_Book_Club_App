import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import axios from "axios";

//===========================Redux====================================
import { setBooks, addBook, deleteBookById } from "../Redux/reducers/books";
import {addToReadingList} from "../Redux/reducers/reading"

import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn, books ,readingList} = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      books: state.books.books,
      readingList:state.readingList.readingList
    };
  });

   
  const [message, setMessage] = useState("");

 

  //===============================================================

  const getAllBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      console.log(res.data.rooms);
      if (res.data.success) {
        dispatch(setBooks(res.data.rooms));
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

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      dispatch(deleteBookById(id));
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const addtoread = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      dispatch(deleteBookById(id));
    } catch (error) {
      console.log(error);
    }
  };
 


  //=========================================================================

  useEffect(() => {
    getAllBooks();
  }, []);

  //===============================================================

  console.log(books);

  return (
    <>
      <br />
      {books &&
        books.map((book, index) => (
          <div key={index} className="book">
            <div>{book.Title}</div>
<div>  <img src={book.book_img}></img>      </div>
            <button className="delete" onClick={() => deleteBook(book.id)}>
       Join Room
            </button>

            <button className="addToRead" onClick={() => deleteBook(book.id)}>
           Add To readList
            </button>


          </div>
        ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default Dashboard;
