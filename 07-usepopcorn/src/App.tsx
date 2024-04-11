import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import data from './data.json';
import Search from './components/Navbar/Search';
import NumResult from './components/Navbar/NumResult';
import Main from './components/Main';
import MovieList from './components/MovieList';
import Box from './components/Box';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';

function App() {
	const [movies, setMovies] = useState(data.tempMovieData);
	const [watched, setWatched] = useState(data.tempWatchedData);
	return (
		<>
			<Navbar>
				<Search />
				<NumResult movieLength={movies.length} />
			</Navbar>
			<Main>
				<Box>
					<MovieList movies={movies} />
				</Box>
				<Box>
					<WatchedSummary watched={watched} />
					<WatchedMovieList watched={watched} />
				</Box>
			</Main>
		</>
	)
}

export default App
