import './App.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import MoviePage from './pages/movie/movie';
import MovieDetail from './pages/movie-detail/movie-detail';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<MoviePage />} />
            <Route path="/movie-detail/:id" element={<MovieDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
