import Movie from "./Movie";

function MovieList({ movies, onHandleSelectMovie }: any) {
    
    return (
        <ul className="list list-movies">
            {movies?.map((movie: any) => (
                <Movie key={movie.imdbID} movie={movie} onHandleSelectMovie={onHandleSelectMovie}/>
            ))}
        </ul>
    )
}

export default MovieList
