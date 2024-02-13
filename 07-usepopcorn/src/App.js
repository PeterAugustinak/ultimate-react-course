import { useState, useEffect } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "8c99f3d0";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const query = "wedwed"

    // we cannot use the fetch and setState inside the component as it is causing
    // infinite re-rendering - that's why useEffect
    useEffect(function () {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
                );
                if(!res.ok)
                    throw new Error("Something went wrong ...");

                const data = await res.json();
                if (data.Response === 'False')
                    throw new Error("Movie not found!")


                setMovies(data.Search);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
        }, []);

    // we need `movies` prop in various component down the tree, so instead of moving
    // this prop one by one through the components along the way, we create tree in
    // here a change the "intermediate" components to accept children - which are
    // another components
    // navbar component is now accepting children - we placed Search and SearchResult
    // as a children where SearchResult now directly accept movies prop, instead of
    // moving in down through intermediate NavBar component

    // same with Main component - movies are needed inside the MoviesList, so we
    // have created tree so movies prop does not need to travel through intermediate
    // Main and ListBox components

      return (
      <>

        <NavBar>
            <Search />
            <SearchResults movies={movies}/>
        </NavBar>

        <Main>

            <Box>
                {isLoading && <Loader />}
                {!isLoading && !error && <MovieList movies={movies}/>}
                {error && <ErrorMessage message={error} />}
            </Box>

            <Box>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </Box>

        </Main>

      </>
    )
}

function Loader() {
    return <p className="loader">LOADING ...</p>
}


function ErrorMessage({error}) {
    return (
        <p className="error">
            <span>{error}</span>
        </p>
    )
}


// structural component
function NavBar({children}) {

  // children here are now <Search> and <SearchResults>
  return (
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
  )
}

// presentational component (no state)
function Logo() {
    return (
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
    )
}

// stateful component
function Search() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

// presentational
function SearchResults({movies}) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

// structural
function Main({children}) {
  // children here are now <ListBox> and <WatchedBox>
  return (
      <main className="main">
        {children}
      </main>
    )
}

// stateful
function Box({children}) {
  // common box for ListBox and WatchedBox
  const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && children}
        </div>
    )
}


//stateful
function MovieList({movies}) {
    return (
            <ul className="list">
              {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID}/>
              ))}
            </ul>
    )
}

// presentational
function Movie({movie}) {
    return (
        <li>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
    )
}


// presentational
function WatchedSummary({ watched}) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>
    )
}

// presentational
function WatchedMoviesList({ watched }) {
    return (
      <ul className="list">
        {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie.imdbID} />
        ))}
      </ul>
    )
}

// presentational
function WatchedMovie({ movie }) {
    return (
      <li>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
      </li>
      )
}
