import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Search from './components/Navbar/Search';
import NumResult from './components/Navbar/NumResult';
import Main from './components/Main';
import MovieList from './components/MovieList';
import Box from './components/Box';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';
import MovieDetails from './components/MovieDetails';
import { useMovies } from './hooks/useMovies';

function App() {
	//kita pindahkan 3 state ini ke customHook useMovies
	// const [movies, setMovies] = useState([]);
	// const [loading, setLoading] = useState(false);
	// const [error, setError] = useState("");
	
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedId, setSelectedId] = useState(null);
	//const [watched, setWatched] = useState([]);
	//inisialisasi dengan lazy initial, jadi kita akan inisialisasi state awal dengan mengambil value dari localstorage
	const [watched, setWatched] = useState(function() {
		const storedValue = localStorage.getItem("watched") as string;
		return JSON.parse(storedValue);
	})
	//kenapa gak langsung aja const [watched, setWatched] = useState(localStorage.getItem("watched")); ?
	//jangan lakukan itu , itu bad , karena react akan mengabaikannya, karena akan memanggil function ketika ada re render
	
	const { movies, loading, error } = useMovies(searchQuery);

	function handleSelectMovie(id: any) {
		setSelectedId(currId => currId === id ? null : id);
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie: any[]) {
		setWatched((currentWatched: any) => [...currentWatched, movie]);

		//kenapa ga JSON.stringify(watched) ?
		//karena useState saat set itu asynchronous jadi masih stale
		//oleh karena itu kita ambil data current watched di tambah dengan movie yang baru di tambahkan
		//localStorage.setItem('watched', JSON.stringify([...watched, movie]));
		//kita pindah cara dengan pakai useEffect
	}

	useEffect(function() {
		//di sini kita bisa langsung menggunakan state nya watched langsung, karena useEffect akan di jalankan setelah render
		//jadi setWatched nya sudah selesai di jalankan
		localStorage.setItem('watched', JSON.stringify(watched));
	}, [watched])

	function handleDeleteWatched(id: any) {
		setWatched((currentWatched: any[]) => currentWatched.filter((watch: { imdbID: any; }) => watch.imdbID !== id));
	}

	//callback
	// useEffect(function() {
	// 	fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
	// 	.then((res) => res.json())
	// 	.then((data) => setMovies(data.Search));
	// }, []);

	//Pakai async await
	//kita komen dulu , kita coba pakai customHook useMovies
	// useEffect(function() {
	// 	const controller = new AbortController(); 
	// 	async function fetchMovies() {
	// 		try {
	// 			setLoading(true);
	// 			setError("");
	// 			const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${searchQuery}`, {signal: controller.signal});

	// 			if(!res.ok) {
	// 				throw new Error("Something wnet wrong when fetch movies");
	// 			}

	// 			const data = await res.json();

	// 			if(data.Response === 'False') throw new Error("Movie not found");
	// 			setMovies(data.Search);
	// 			setError("");
	// 		} catch (err) {
	// 			if(err.name !== 'AbortError') {
	// 				setError(err.message);
	// 			}
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	}

	// 	if(searchQuery.length < 3) {
	// 		setMovies([]);
	// 		setError("");
	// 		return;
	// 	}
	// 	fetchMovies();

	// 	//Clean Up
	// 	return function(){
	// 		controller.abort();
	// 	}
	// },[searchQuery])

	return (
		<>
			<Navbar>
				<Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
				<NumResult movieLength={movies.length} />
			</Navbar>
			<Main>
				<Box>
					{/* { loading ? <Loading /> : <MovieList movies={movies} /> } */}
					{loading && <Loading />}
					{!loading && !error && <MovieList movies={movies} onHandleSelectMovie={handleSelectMovie} />}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails 
							selectedId={selectedId} 
							onhandleCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched} 
							watched={watched}
						/> 
					): <>
						<WatchedSummary watched={watched} />
						<WatchedMovieList watched={watched} onDeleteWathced={handleDeleteWatched} />
					</>}		
				</Box>
			</Main>
		</>
	)
}

function Loading() {
	return(
		<p className='loader'>Loading....</p>
	)
}

function ErrorMessage({message}: any) {
	return (
		<p className='error'>
			{message}
		</p>
	)
}

export default App
