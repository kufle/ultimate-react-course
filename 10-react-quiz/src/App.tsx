import { useEffect, useReducer } from "react"
import Header from "./components/Header"
import Main from "./components/Main"
//import DateCounter from "./DateCounter"
import Loader from "./components/Loader"
import ErrorMessage from "./components/Error"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"
import NextButton from "./components/NextButton"
import Progress from "./components/Progress"
import FinishedScreen from "./components/FinishedScreen"

const initialState = {
	questions: [],
	status: "loading",
	errMessage: "",
	index: 0,
	answer: null,
	points: 0,
	highscore: 0
}

function reducer(state: any, action: any){
	switch(action.type) {
		case 'dataReceived':
			return {
				...state, 
				questions: action.payload,
				status: 'ready'
			}
		case 'dataFailed':
			return {
				...state,
				status: 'error',
				errMessage: action.payload
			}
		case 'start':
			return {
				...state,
				status: 'active'
			}
		case 'newAnswer':
			const question = state.questions.at(state.index);

			return {
				...state,
				answer: action.payload,
				points: action.payload === question.correctOption 
					? state.points + question.points 
					: state.points
			}
		case 'nextQuestion':
			return {
				...state,
				index: state.index + 1,
				answer: null
			}
		case 'finishQuestion':
			return {
				...state,
				status: 'finished',
				highscore: state.points > state.highscore ? state.points : state.highscore
			}
		case 'restart':
			return {
				...initialState,
				questions: state.questions, 
				status: 'ready'
			}
		default:
			throw new Error("Action unknown")
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch("http://localhost:9000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: 'dataReceived', payload: data }))
			.catch((err) => dispatch({ type: 'dataFailed', payload: err.message }))
	}, []);

	const numQuestions = state.questions.length;
	const maxPossiblePoints = state.questions.reduce((prev: any, question: any) => prev + question.points, 0)

	return (
		// <DateCounter />
		<div className="app">
			<Header />

			<Main>
				{state.status === 'loading' && <Loader />}
				{state.status === 'error' && <ErrorMessage />}
				{state.status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
				{state.status === 'active' && (
					<>
					<Progress 
						index={state.index}
						numQuestions={numQuestions}
						maxPossiblePoints={maxPossiblePoints}
						points={state.points}
						answer={state.answer}
					/>
					<Question 
						question={state.questions[state.index]}
						dispatch={dispatch}
						answer={state.answer}
					/>
					<NextButton 
						dispatch={dispatch} 
						answer={state.answer}
						index={state.index}
						numQuestions={numQuestions} 
					/>
					</>
				)}
				{state.status == 'finished' && (
					<FinishedScreen 
						points={state.points}
						maxPossiblePoints={maxPossiblePoints}
						highscore={state.highscore}
						dispatch={dispatch}
					/> 
				)}
			</Main>
		</div>
	)
}

export default App
