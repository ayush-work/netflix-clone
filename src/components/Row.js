import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import movieTrailer from "movie-trailer";
import "../components/Row.css";
const IMAGE_URL = `https://image.tmdb.org/t/p/w500`;
const Row = ({ title, fetchUrl, isLargePoster }) => {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [clickedMovie, setClickedMovie] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchMovies();
  }, [fetchUrl]);

  // const handleClick = (movie) => {
  //   if (trailerUrl) {
  //     setTrailerUrl("");
  //   } else {
  //     movieTrailer(movie?.name || "")
  //       .then((url) => {
  //         const urlParams = new URLSearchParams(new URL(url).search);
  //         setTrailerUrl(urlParams.get("v"));
  //       })
  //       .catch((err) => {});
  //   }
  // };
  const handleClick = (movie) => {
    if (clickedMovie) {
      setClickedMovie("");
    } else setClickedMovie(movie);
  };
  useEffect(() => {
    console.log("clicked");
  }, [clickedMovie]);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <>
              <img
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargePoster ? `large` : ""}`}
                src={`${IMAGE_URL}${
                  isLargePoster ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title}
                key={movie.id}
              />
            </>
          );
        })}
      </div>
      {clickedMovie && (
        <div className="row__poster--info">
          {clickedMovie?.title || clickedMovie?.name}
        </div>
      )}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
    </div>
  );
};

export default Row;
