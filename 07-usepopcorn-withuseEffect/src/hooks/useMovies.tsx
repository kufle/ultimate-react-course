import { useEffect, useState } from "react";

const KEY = 'a32eab02';
export function useMovies(searchQuery: any) {
    const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

    useEffect(function() {
		const controller = new AbortController(); 
		async function fetchMovies() {
			try {
				setLoading(true);
				setError("");
				const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${searchQuery}`, {signal: controller.signal});

				if(!res.ok) {
					throw new Error("Something wnet wrong when fetch movies");
				}

				const data = await res.json();

				if(data.Response === 'False') throw new Error("Movie not found");
				setMovies(data.Search);
				setError("");
			} catch (err: any) {
				if(err.name !== 'AbortError') {
					setError(err.message);
				}
			} finally {
				setLoading(false);
			}
		}

		if(searchQuery.length < 3) {
			setMovies([]);
			setError("");
			return;
		}
		fetchMovies();

		//Clean Up
		return function(){
			controller.abort();
		}
	},[searchQuery]);

    return { movies, loading, error }
}