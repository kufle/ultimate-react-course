function Question({ question, dispatch, answer }: any) {
    const hasAnswered = answer !== null;
    
    return (
        <div>
            <h4>{question.question}</h4>

            <div className="options">
                {question.options.map((option: any, index: number) => (
                    <button 
                        key={index} 
                        className={
                            `btn btn-option ${index === answer ? 'answer' : ''}
                            ${hasAnswered ? 
                                question.correctOption === index ? 'correct' : 'wrong'
                            : ''
                            }
                        `}
                        disabled={hasAnswered}
                        onClick={() => dispatch({type: 'newAnswer', payload: index})}
                    >{option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Question