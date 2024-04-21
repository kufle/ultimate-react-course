import { useEffect, useState } from "react"
import StarRating from "./StarRating";

function MovieDetails({selectedId, onhandleCloseMovie, onAddWatched, watched}: any) {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const isWatched = watched.map(watch => watch.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(watch => watch.imdbID === selectedId)?.userRating;
    
    useEffect(function() {
        async function getMovieDetail() {
            setLoading(true);
            const res = await fetch(`https://www.omdbapi.com/?apikey=a32eab02&i=${selectedId}`)
            const data = await res.json();
            setMovie(data);
            setLoading(false);
        }
        getMovieDetail();
    }, [selectedId]);

    useEffect(function() {
        if(!movie.Title) return;
        document.title = `Movie | ${movie.Title}`

        return function() {
            document.title = 'usePopcorn'
            console.log(`Clean up effect fot move ${movie.Title}`);
        }
    }, [movie.Title])

    //Close Movie using escape keyboard
    useEffect(function() {
        function callback(e) {
            if(e.code === 'Escape') {
				onhandleCloseMovie();
				console.log("CLOSING")
			}
        }

		document.addEventListener("keydown", callback)

        //Clean Up
        return function () {
            document.removeEventListener("keydown", callback);
        }
	}, [onhandleCloseMovie])

    function handleAddWatched(){
        const newMovie = {
            ...movie,
            imdbRating: Number(movie.imdbRating),
            Runtime: Number(movie.Runtime.split(" ").at(0)),
            userRating
        }
        
        onAddWatched(newMovie);
        onhandleCloseMovie();
    }

    if(loading) return <p>Loading</p>
    
    return (
        <div className="details">
            <header>
                <button className="btn-back" onClick={onhandleCloseMovie}>
                    &larr;
                </button>
                <img src={movie.Poster} alt="" />
                <div className="details-overview">
                    <h2>{movie.Title}</h2>
                    <p>
                        {movie.Year} &bull; {movie.Runtime}
                    </p>
                    <p>{movie.Genre}</p>
                    <p><span>⭐</span> {movie.imdbRating} IMDb rating</p>
                </div>
            </header>

            <section>
                <div className="rating">
                    {!isWatched ? (
                        <>
                            <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                            {userRating > 0 && (
                                <button className="btn-add" onClick={handleAddWatched}>+ add to list</button>
                            )}
                        </>
                    ): (
                        <p>You rated with movie {watchedUserRating}</p>   
                    )
                    }
                    
                </div>
                <p><em>{movie.Plot}</em></p>
                <p>Starring {movie.Actors}</p>
                <p>Directed by {movie.Director}</p>
            </section>
        </div>
    )
}

export default MovieDetails
