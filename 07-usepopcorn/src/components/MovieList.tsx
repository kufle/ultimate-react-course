import Movie from "./Movie";

function MovieList({ movies }: any) {
    
    return (
        <ul className="list">
            {movies?.map((movie: any) => (
                <Movie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}

export default MovieList
