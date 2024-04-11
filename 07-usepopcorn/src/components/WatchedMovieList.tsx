import WatchedMovie from "./WatchedMovie"

function WatchedMovieList({ watched }: any) {
    return (
        <ul className="list">
            {watched.map((movie: any) => (
                <WatchedMovie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    )
}

export default WatchedMovieList
