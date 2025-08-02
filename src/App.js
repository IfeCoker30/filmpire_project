import React from 'react';
import { useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg'; // Importing a search icon
import MovieCard from './MovieCard.jsx'; // Importing the MovieCard component

const API_URL = 'https://omdbapi.com?apikey=6051f83';
// const movie1 = {
//     "Title": "Discount Spiderman 2",
//     "Year": "2018",
//     "imdbID": "tt9146610",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BY2U4NjY2YTQtZDFiYS00YTk2LTk5NDItMWVlNmIwZjYyZmE5XkEyXkFqcGc@._V1_SX300.jpg"
// }

function App() {
  const [movies, setMovies] = useState([]); // State to hold movie data
  const [searchTerm, setSearchTerm] = useState(''); // State to hold search term

  //a function that is going to fetch the data from the API(movies)
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    setMovies(data.Search);
  };

  useEffect(() => {
    const movieTitle = 'Spiderman';
    // Call the searchMovies function with the movie title
    searchMovies(movieTitle);
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Log the input value
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)} // Call searchMovies with a hardcoded title
        />
      </div>

      {
        movies?.length > 0
          ? (
              <div className='container'>
                {movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.imdbID} />
                ))}
              </div>
          ) : (
              <div className="empty">
                <h2>No movies found</h2>
              </div>
          )
      }
    </div>
  );
}

export default App;
