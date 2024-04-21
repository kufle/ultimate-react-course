function WatchedMovie({ movie, onDeleteWathced }: any) {
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
                    <span>{movie.Runtime} min</span>
                </p>

                <button className="btn-delete" onClick={() => onDeleteWathced(movie.imdbID)}>X</button>
            </div>
        </li>
    )
}

export default WatchedMovie
