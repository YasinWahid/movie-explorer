import './home.css'; 
import Banner from '../../components/banner/banner';
import TrendingMovies from '../../components/trending-slider/trending-slider';
import PopularMovies from '../../components/popular-slider/popular-slider';

const Home = () => {
  return (
    <div className="home-page">
      <Banner/>
      <TrendingMovies/>
      <PopularMovies/>
    </div>
  );
};

export default Home;
