import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

import "./style.css";
/* import "bootstrap/dist/css/bootstrap.min.css"; */
import { Button, Card } from "react-bootstrap";

function Books() {
  const navigate = useNavigate();

  const movieDetails = (element) => {
    console.log(element);

    navigate(`/details/${element.id}`);
  };

  const [movie, setMovie] = useState("");
  const [load, setLoad] = useState("");
  const [page, setPage] = useState(1);

  const getMovie = () => {
    axios
      .get(
        "http://localhost:5000/books"
      )

      .then((response) => {
        console.log(response.results);
        setMovie(response.data.results);
      })

      .catch((err) => {
        throw err;
      });
  };

  ///////////////////////////////

  const getMore = async () => {
    setPage(page + 1);

    await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=1bfa430aada4409bfa6a3c5528128e8a&page=${
          page + 1
        }`
      )

      .then((response) => {
        console.log(response.data.results);
        setLoad(response.data.results);
        setMovie([...movie, ...response.data.results]);
      })

      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    if (movie.length === 0) {
      getMovie();
    }
  }, []);
 
  return (
    <div className="Home">
      <div className="movies">
        {movie &&
          movie.map((element, index) => {
            return (
              <div className="item" key={index}>
                <div className="movie-image">
                  <img className="movImg"
                    onClick={() => {
                      movieDetails(element);
                    }}
                    src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${element.poster_path}`}
                  />
                </div>

                <div className="movie-details">
                  <div className="header" >
                    <p className="movie-title"
                      onClick={() => {
                        movieDetails(element);
                      }}
                    >
                      {element.original_title}
                    </p>

               
                  </div>

                  <div className="movie-description">
                    <p className="desc"> {element.overview.substring(0, 250)}</p>
                  </div>
                  <p  className="movie-date">  {element.release_date}</p>
                </div>
              </div>
            );
          })}
      </div>
      <br></br>
      <Button
        variant="primary"
        onClick={() => {
          getMore();
        }}
      >
        Load More
      </Button>
      
    </div>
  );
}
export default Books;

 