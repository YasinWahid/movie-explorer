import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./popular-slider.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } }, 
    ],
  };

  return (
    <div className="container popular-movies">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="title">Popular Movies</h3>
      </div>
      <Slider {...settings}>
        {movies.map((movie) => {
          const strokeColor =
            movie.vote_average * 10 >= 70
              ? "#4CAF50"
              : movie.vote_average * 10 >= 50
              ? "#F1C40F"
              : "#E74C3C";
          return (
            <div key={movie.id} className="p-2">
              <Link to={`/movie-detail/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="position-relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded img-fluid"
                  />
                  <div className="prating-container">
                    <svg width="38" height="38" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="18" className="prating-bg" />
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        className="prating-bar"
                        stroke={strokeColor}
                        strokeDasharray="113"
                        strokeDashoffset={113 - (movie.vote_average * 10 / 100) * 113}
                      />
                      <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="prating-text">
                        {Math.round(movie.vote_average * 10)}%
                      </text>
                    </svg>
                  </div>
                </div>
                <h5 className="prating-movie-title mt-4">{movie.title}</h5>
                <p className="text-muted">{movie.release_date.split("-")[0]}</p>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default PopularMovies;
