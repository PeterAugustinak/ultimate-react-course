import React from "react";
import ReactDOM from "react-dom/client";

function App() {
    return <h1>Hello React</h1>
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // optional but useful for development
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// older than v18
// import ReactDOM from "react-dom";
// ReactDOM.render(<App />, document.getElementById("root"));
