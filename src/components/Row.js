import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import movieTrailer from "movie-trailer";
import ScrollIntoView from "react-scroll-into-view";
import FadeIn from "react-fade-in";
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
  const popupRef = useRef();

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
    popupRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    if (clickedMovie !== movie) {
      setClickedMovie(movie);
    }
    if (clickedMovie === movie) {
      setClickedMovie("");
    }
  };

  console.log(movies);
  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargePoster ? `large` : ""}`}
              src={`${IMAGE_URL}${
                isLargePoster ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
              key={movie.id}
            />
          );
        })}
      </div>
      {clickedMovie && (
        <FadeIn>
          <div className="row__popup" ref={popupRef}>
            <div className="row__popup__poster">
              <img
                src={`${IMAGE_URL}${clickedMovie?.poster_path}`}
                alt={clickedMovie?.title}
              />
              <div className="row__popup__rating">
                {" "}
                {clickedMovie?.adult ? "PG" : "G"}
              </div>
            </div>

            <div className="row__popup__content">
              <div className="row__popup__title">
                <div>{clickedMovie?.title || clickedMovie?.name}</div>
                <button className="row__popup__add">
                  <i class="bx bx-plus"></i>My List
                </button>
              </div>
              <h3 className="row__popup__description">
                {clickedMovie?.overview}
              </h3>
              <h3 className="row__popup__vote">
                Average Rating : {clickedMovie?.vote_average}
              </h3>
            </div>
          </div>
        </FadeIn>
      )}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
    </div>
  );
};

export default Row;
