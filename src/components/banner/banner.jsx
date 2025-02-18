import { Link } from "react-router-dom";
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <h1 className="banner-title"> Movie Explorer Wrap 2025</h1>
        <p className="banner-description">
        The best (and worst) of the year from Movie Explorer
        </p>
        <Link to="/movies" className="btn btn-primary">Check it out</Link>
      </div>
    </div>
  );
};

export default Banner;
