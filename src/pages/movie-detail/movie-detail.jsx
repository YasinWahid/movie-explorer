import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./movie-detail.css";


const API_KEY = import.meta.env.VITE_API_KEY;

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchCastAndCrewDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        const data = await response.json();
        setCast(data.cast);
        setCrew(data.crew);
      } catch (error) {
        console.error("Error fetching cast and crew details:", error);
      }
    };


    Promise.all([fetchMovieDetails(), fetchCastAndCrewDetails()]).finally(() =>
      setLoading(false)
    ); 
  }, [id]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!movie) {
    return <div className="container">Movie not found.</div>;
  }


  const percentageRating = Math.round(movie.vote_average * 10);


  const strokeColor =
    percentageRating >= 70
      ? "#4CAF50"
      : percentageRating >= 50
      ? "#F1C40F"
      : "#E74C3C";

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  const director = crew.find((member) => member.job === "Director");
  const writer = crew.find((member) => member.job === "Writer");

  return (
    <div className="main">
      <div className="container movie-detail">
        <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
          <i className="bi bi-arrow-left"></i>
        </button>

        <div className="row">
          <div className="col-md-4">
            <div className="image-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid rounded"
              />
            </div>
          </div>
          <div className="col-md-8">
            <h2 className="movie-title">{movie.title}</h2>
            <div className="movie-info">
              <span>{movie.release_date}</span> |{" "}
              <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>{" "}
              |{" "}
              <span>
                {movie.runtime
                  ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                  : "N/A"}
              </span>
            </div>
            <div className="mdrating-container">
              <svg width="70" height="70" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" className="mdrating-bg" />
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  className="mdrating-bar"
                  stroke={strokeColor}
                  strokeDasharray="113"
                  strokeDashoffset={113 - (percentageRating / 100) * 113}
                />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  className="mdrating-text"
                >
                  {percentageRating}%
                </text>
              </svg>
            </div>
            <h2>Overview</h2>
            <p className="overview">{movie.overview}</p>
            <div className="movie-crew">
              <strong>Director:</strong> {director ? director.name : "N/A"} |{" "}
              <strong>Writer:</strong> {writer ? writer.name : "N/A"}
            </div>
          </div>
        </div>
      </div>

      <div className="cast">
        <h2 className="cast-title">Top Billed Cast</h2>
        <Slider {...settings} className="cast-slider">
          {cast.slice(0, 10).map((actor, index) => (
            <div key={index} className="cast-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className="cast-img"
              />
              <h5 className="actor-name">{actor.name}</h5>
              <p className="character-name">{actor.character}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieDetail;
