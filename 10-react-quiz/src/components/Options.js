import React from 'react';

const Options = ({question, dispatch, answer}) => {
    // prevent to show correct answer by css classes already set
    const hasAnswered = answer !== null;

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={
                        `btn btn-option ${index === answer ? "answer" : ""}
                         ${hasAnswered ?
                            index === question.correctOption ?
                                "correct" : "wrong"
                            : ""
                        }`
                    }
                    key={option}
                    disabled={answer !== null}
                    onClick={() => dispatch(
                        {type: "newAnswer", payload: index})}
                >
                    {option}
                </button>))}
        </div>
    );
};

export default Options;
