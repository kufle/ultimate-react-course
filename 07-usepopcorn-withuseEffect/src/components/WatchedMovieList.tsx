import WatchedMovie from "./WatchedMovie"

function WatchedMovieList({ watched, onDeleteWathced }: any) {
    return (
        <ul className="list">
            {watched.map((movie: any) => (
                <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWathced={onDeleteWathced} />
            ))}
        </ul>
    )
}

export default WatchedMovieList
