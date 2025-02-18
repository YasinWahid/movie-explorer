import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState(5);
  const [noResults, setNoResults] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;


  useEffect(() => {
    const fetchMovies = async () => {
      if (search.trim() === "") {
        setMovies([]);
        setNoResults(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search.trim()}&language=en-US`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setMovies(data.results);
          setNoResults(false);
        } else {
          setMovies([]);
          setNoResults(true);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovies([]);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [search, API_KEY]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setVisibleMovies(5);
  };

  const handleMovieClick = () => {
    setShowSearch(false);
    setSearch("");
  };

  const handleLoadMore = () => {
    setVisibleMovies((prev) => prev + 5);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top p-3">
        <div className="container-fluid">
          <Link className="navbar-brand me-3" to="/">
            Movie Explorer
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/movie">
                  Movies
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/join">
                  Join Movie-Explorer
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn text-white"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <FaSearch size={18} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={`search-container ${showSearch ? "d-block" : "d-none"}`}>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search movies..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {movies.length > 0 && (
        <div className="container mt-5 movie-results">
          {movies.slice(0, visibleMovies).map((movie) => (
            <div
              className="d-flex align-items-center p-3 movie-item"
              key={movie.id}
              onClick={handleMovieClick}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid me-3"
                style={{ maxWidth: "80px", maxHeight: "100px" }}
              />
              <div>
                <Link to={`/movie-detail/${movie.id}`} className="text-black">
                  <h6 className="fw-bold">{movie.title}</h6>
                </Link>
                <p className="text-muted small">{movie.overview}</p>
              </div>
            </div>
          ))}
          {visibleMovies < movies.length && (
            <div className="text-center mt-3">
              <button className="btn btn-info" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </div>
      )}
      {!loading && noResults && search.trim() !== "" && (
        <div className="text-center text-danger pt-4">
          No movies found!
        </div>
      )}
    </>
  );
};

export default Navbar;
