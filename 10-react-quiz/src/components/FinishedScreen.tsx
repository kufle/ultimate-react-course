function FinishedScreen({points, maxPossiblePoints, highscore, dispatch }: any) {
    const percentage = (points / maxPossiblePoints) * 100;

    return (
        <>
        <p className="result">
            Your scored <strong>{points}</strong> 
             out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
             Highscore: {highscore} 
        </p>

        <button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>
            Restart Quiz
        </button>
        </>
    )
}

export default FinishedScreen