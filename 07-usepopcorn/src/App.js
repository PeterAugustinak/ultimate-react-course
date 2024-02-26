import { useState, useEffect, useRef } from "react";

import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "8c99f3d0";


export default function App() {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const {movies, isLoading, error} = useMovies(query);

    const [watched, setWatched] = useLocalStorageState([], "watched");

    // const [watched, setWatched] = useState([]);
//    const [watched, setWatched] = useState(function() {
//        const storedValue = localStorage.getItem('watched')
//        // covert back from stringify to map (we do that in setItem)
//        return JSON.parse(storedValue);
//        }
//    );

    function handleSelectedMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null: id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);

        // storing watched movies into the local storage but better to do it in effect
        // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id ))
    }

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
    // not the best way to focus on an input field
    //  useEffect(function() {
    //      const el = document.querySelector('.search');
    //      el.focus();
    //  }, []);

    // instead use ref
    const inputEl = useRef(null);

    useKey("Enter", function() {
        if(document.activeElement === inputEl.current) return;
        inputEl.current.focus();
        setQuery("");
    });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
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

    const countRef = useRef(0);

    useEffect(function() {
        if (userRating) countRef.current++;
    }, [userRating]);

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

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

    // bad order of hooks examples (breaking of linked-list)
    // BAD: conditional call of hook
    // if (imdbRating > 8) [isTop, setIsTop] = useState(true);

    // BAD: early return
    // if (imdbRating > 8) return <p>Greatest ever!</p>

    // BAD unnecessary usage of useEffect
//    const [isTop, setIsTop] = useState(imdbRating > 8);
//    console.log(isTop);
//    useEffect(function() {
//        setIsTop(imdbRating > 8);
//    },
//    [imdbRating]
//    );

    const isTop = imdbRating > 8
    console.log(isTop);

    const [avgRating, setAvgRating] = useState(0);
    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
            countRatingDecisions: countRef.current,
        }

        onAddWatched(newWatchedMovie);
    }

    useKey("escape", onCloseMovie);

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
