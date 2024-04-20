function Progress({index, numQuestions, maxPossiblePoints, points, answer}: any) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)}/>
            <p>
                Question {index + 1} / {numQuestions}
            </p>

            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    )
}

export default Progress