import React from 'react';

const FinishScreen = ({points, maxPossiblePoints, highscore, dispatch}) => {
    const percentage = (points / maxPossiblePoints) * 100

    let emoji;
    if (percentage === 100) emoji = "A";
    if (percentage >= 80 && percentage < 100) emoji = "B";
    if (percentage >= 60 && percentage < 80) emoji = "C";
    if (percentage >= 40 && percentage < 60) emoji = "D";
    if (percentage < 40) emoji = "E";

    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of {maxPossiblePoints} (
                {Math.ceil(percentage)}%)
                <span> -> {emoji}</span>
            </p>
            <p className="highscore">Highscore: {highscore} points</p>

            <button
                className="btn btn-ui"
                onClick={() => dispatch({type: "restart"})}
            >
                Restart Quiz
            </button>

        </>
    );
};

export default FinishScreen;