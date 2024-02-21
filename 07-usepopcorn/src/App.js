import { useState, useEffect } from "react";
import StarRating from "./StarRating"

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
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);

//    useEffect(function () {
//        console.log("Only after initial render (no dependency")}, []
//    )
//
//    useEffect(function ()
//        {console.log("After every render (depends on everything)")}
//    )
//
//    console.log("During render")

    function handleSelectedMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null: id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id ))
    }

    // we cannot use the fetch and setState inside the component as it is causing
    // infinite re-rendering - that's why useEffect
    useEffect(function () {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
                    {signal: controller.signal}
                );
                if(!res.ok)
                    throw new Error("Something went wrong ...");
                const data = await res.json();
                if (data.Response === "False")
                    throw new Error("Movie not found!")
                setMovies(data.Search);
                setError("");
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if(query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        // to close the selected movie when new search starts
        handleCloseMovie();

        fetchMovies();

        return function() {
            controller.abort();
        };

        }, [query]
        );

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

      // console.log(selectedId);
      return (
      <>

        <NavBar>
            <Search query={query} setQuery={setQuery}/>
            <SearchResults movies={movies}/>
        </NavBar>

        <Main>

            <Box>
                {isLoading && <Loader />}
                {!isLoading && !error && <MovieList
                                            movies={movies}
                                            onSelectedMovie={handleSelectedMovie}
                                         />}
                {error && <ErrorMessage message={error} />}
            </Box>

            <Box>
              {selectedId ? (
                <MovieDetails
                    selectedId={selectedId}
                    onCloseMovie={handleCloseMovie}
                    onAddWatched={handleAddWatched}
                    watched={watched}
                    /> )
                : (
                <>
                    <WatchedSummary watched={watched} />
                    <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
                </>
                )}
            </Box>

        </Main>

      </>
    )
}

function Loader() {
    return <p className="loader">LOADING ...</p>
}


function ErrorMessage({error}) {
    console.log(error)
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
function Search({query, setQuery}) {

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
function MovieList({movies, onSelectedMovie}) {
    return (
            <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} onSelectedMovie={onSelectedMovie}/>
              ))}
            </ul>
    )
}

// presentational
function Movie({movie, onSelectedMovie}) {
    return (
        <li onClick={() => onSelectedMovie(movie.imdbID)}>
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


function MovieDetails({selectedId, onCloseMovie, onAddWatched, watched}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
     } = movie;

    // this sets listener for the entire document
    useEffect(function () {
        function callback(e) {
            if(e.code === "Escape") {
                onCloseMovie();
            }
        }

        document.addEventListener("keydown", callback);

        // clean up function to remove even listener so it is not copied to another component
        return function() {
            document.removeEventListener("keydown", callback);
        }

    }, [onCloseMovie]
    );

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
        }

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(function() {
        async function getMovieDetails() {
        setIsLoading(true);
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
                );
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        }
        getMovieDetails();
    }, [selectedId]);

    useEffect(function() {
        if (!title) return;
        document.title = `Movie | ${title}`;

        // clean up function
        return function() {
            document.title = "usePopcorn";
        }
    }, [title]);

    return (
        <div className="details">
            {isLoading ? <Loader/> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            BACK
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} - {runtime}</p>
                            <p>{genre}</p>
                            <p>{imdbRating} ⭐️ IMDb rating</p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating maxRating={10} size={24} onRateChange={setUserRating}/>
                                    {userRating > 0 && (
                                        <button className="btn-add" onClick={handleAdd}>
                                            + Add Movie
                                        </button>
                                    )}
                                </>
                                ) : (
                                    <p>
                                        You rated this movie already with {watchedUserRating} ⭐️</p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring: {actors}</p>
                        <p>Directed by: {director}</p>
                    </section>
                </>
                }
       </div>
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
            <span>{avgUserRating.toFixed}</span>
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
function WatchedMoviesList({ watched, onDeleteWatched}) {
    return (
      <ul className="list">
        {watched.map((movie) => (
            <WatchedMovie movie={movie} onDeleteWatched={onDeleteWatched} key={movie.imdbID} />
        ))}
      </ul>
    )
}

// presentational
function WatchedMovie({ movie, onDeleteWatched }) {
    return (
      <li>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
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

          <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>
            X
          </button>
        </div>
      </li>
      )
}
