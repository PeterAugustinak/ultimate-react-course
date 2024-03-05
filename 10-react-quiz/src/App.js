import Header from "./Header";
import Main from "./Main";
import React, {useEffect, useReducer} from "react";

const initialState = {
    questions: [],
    // states: loading, error, ready, active, finished
    status: 'loading',
}

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            }
        case "dataFailed":
            return {
                ...state,
                status: "error",
            }
        default:
            throw new Error("Action unknown");
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // read data from fake json server on mount
    useEffect(() => {
        fetch("http://localhost:8003/questions")
            .then((res) => res.json())
            .then((data) => dispatch({type: 'dataReceived', payload: data}))
            .catch((err) => dispatch({type: 'dataFailed'}))
    }, []);

    return (
        <div className="app">
            <Header/>
            <Main>
                <p>1/15</p>
                <p>Question?</p>
            </Main>


        </div>
    )
}
