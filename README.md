# Movie Explorer App

## Introduction

The **Movie Explorer App** is a web application designed to allow users to search, explore, and get detailed information about movies and TV shows. The app integrates with the [TMDB (The Movie Database) API](https://www.themoviedb.org/) to fetch movie data in real-time, including titles, ratings, release dates, and overviews. The application offers a seamless browsing experience with trending movies, search functionality, and a detailed movie view.

### Tech Stack:
- **Frontend**: HTML, CSS, JavaScript (React.js)
- **API**: TMDB API for fetching movie data
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: CSS (with responsive design)
- **Package Manager**: npm (Node Package Manager)

---

## Setup & Installation

### Prerequisites:
- **Node.js** (version 22.11 or higher)
- **npm** (Node Package Manager)

### Step-by-Step Instructions:

1. **Clone the repository:**

   Open your terminal or command prompt and run the following command to clone the repository:
   ```bash
 [  git clone https://github.com/YasinWahid/movie-explorer.git
   ```

2. **Navigate to the project folder:**

   Change to the directory of your cloned repository:
   ```bash
   cd movie-explorer-app
   ```

3. **Install dependencies:**

   Install the required dependencies using npm:
   ```bash
   npm install
   ```

4. **Set up environment variables:**

   - Create a `.env` file in the root of the project.
   - Add your TMDB API key in the `.env` file:
     ```
     REACT_APP_TMDB_API_KEY=your-api-key
     ```
     Or if built using **Vite**, use:
     ```
     VITE_API_KEY=your-api-key
     ```

5. **Start the development server:**

   To start the development server and view the app in your browser, run:
   ```bash
   npm start
   ```

---

## Project Structure

The project is organized as follows:

```
movie-explorer-app/
├── public/
│   ├── index.html
├── src/
│   ├── assets/                # Static files like images and icons
│   ├── components/            # Reusable UI components (e.g., Footer, Navbar, TrendingMovies, PopularMovies)
│   ├── pages/                 # Main pages (e.g., Home, MovieDetail, Movie)
│   ├── App.jsx                # Main app component
│   ├── index.jsx              # Entry point for React
│   └── .env                   # Environment variables (API key)
```

### Routing Strategy:
- **React Router** is used for page navigation. The main routes are:
  - `/`: Home page displaying trending movies and search functionality.
  - `/movie/:id`: Detailed view of a specific movie or TV show.

### State Management:
- **React Hooks** (`useState`, `useEffect`) are used for managing component state and side effects.
  - `useState` is used to handle the state for movies, loading, and error messages.
  - `useEffect` is used to fetch data from the API when the component is mounted or when the search term is changed.

---

## API Integration Details

### API Calls:
- The app integrates with the **TMDB API** to fetch data.
  - The API endpoint used is `https://api.themoviedb.org/3/search/movie?query={query}&api_key={apiKey}` for searching movies by name.
  - The API endpoint used for trending movies is `https://api.themoviedb.org/3/trending/movie/day?api_key={apiKey}`.

### Error Handling:
- The app checks if the API request returns an error (e.g., no results found or network issues) and displays an appropriate error message to the user.
- If no movies are found for the search query, a "No results found" message is shown.

---

## Design Implementation

### Translating Design to React Components:
- The app's design is broken down into several reusable React components:
  - **MovieCard**: Displays individual movie information (title, rating, release date).
  - **SearchBar**: Input field for searching movies.
  - **MovieDetail**: Displays detailed information about a single movie or TV show.

