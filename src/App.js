import React from "react";
import Row from "../src/components/Row";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import requests from "./requests";
import FadeIn from "react-fade-in";
function App() {
  return (
    <FadeIn>
      <div className="App">
        <Navbar></Navbar>
        <Banner></Banner>
        <Row
          isLargePoster
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
        ></Row>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending}></Row>
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated}></Row>
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}></Row>
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}></Row>
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}></Row>
        <Row
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
        ></Row>
        <Row title="Documentries" fetchUrl={requests.fetchDocumentries}></Row>
      </div>
    </FadeIn>
  );
}

export default App;
