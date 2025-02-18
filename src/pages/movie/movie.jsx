import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./movie.css";

const API_KEY = import.meta.env.VITE_API_KEY;

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results.slice(0, 20));
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const getRatingPercentage = (rating) => Math.round((rating / 10) * 100);


  const getRatingColor = (rating) => {
    if (rating > 70) return "green"; 
    if (rating >= 50) return "yellow"; 
    return "red"; 
  };

  const handleMovieClick = (id) => {
    navigate(`/movie-detail/${id}`);
  };

  return (
    <div className="movie-page">
      <h2 className="title">Movies</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="row">
            {movies.map((movie) => {
              const ratingPercentage = getRatingPercentage(movie.vote_average);
              const ratingColor = getRatingColor(ratingPercentage);

              return (
                <div key={movie.id} className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4">
                  <div className="card movie-card h-100" onClick={() => handleMovieClick(movie.id)}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="card-img-top"
                      alt={movie.title}
                    />
                    <div className="card-body">
                      <h6 className="mrating-movie-title mt-2">{movie.title}</h6>
                    </div>

                    <div className="mrating-container">
                      <svg width="40" height="40" viewBox="0 0 40 40">
                        <circle className="mrating-bg" cx="20" cy="20" r="18" stroke="gray" strokeWidth="3" fill="black" />
                        <circle
                          className="mrating-bar"
                          cx="20"
                          cy="20"
                          r="18"
                          stroke={ratingColor}
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="113"
                          strokeDashoffset={113 - (ratingPercentage / 100) * 113}
                        />
                        <text x="20" y="24" textAnchor="middle" className="mrating-text">
                          {ratingPercentage}
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <nav className="mt-4 pagination-controls">
            <ul className="pagination justify-content-center">
              {[...Array(5)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <li key={pageNum} className={`page-item ${page === pageNum ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(pageNum)}>
                      {pageNum}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default MoviePage;
