import React, { useEffect, useState } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";
const Banner = () => {
  const [movie, setMovie] = useState();
  useEffect(() => {
    async function fetchMovies() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchMovies();
  }, []);

  function truncateString(str, num) {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "top center",
        backgroundColor: "#111",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__btn-grp">
          <button className="btn">Play</button>
          <button className="btn">My List</button>
          {/* banner__btn-group */}
        </div>
        <h2 className="banner__description">
          {truncateString(movie?.overview, 150)}
        </h2>
        {/* banner__description */}
      </div>
      <div className="fade"></div>
    </header>
  );
};

export default Banner;
