import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
import StarRating from './StarRating';

import { useState } from "react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <StarRating
        maxRating={3}
        messages={
            ['terrible', 'bad', 'good', 'very good', 'excellent']
        }
    />
    <StarRating
        maxRating={7}
        size={22}
        color="red"
        className="test"
        defaultRating={3}
        />

    <SeparateStarRatingElement />
  </React.StrictMode>
);

// example when set state is sent into the component so we can use starr
// rating value outside of used component
function SeparateStarRatingElement() {
    const [movieRating, setMovieRating] = useState(0);

    return (
        <div>
            <StarRating color="blue" onRateChange={setMovieRating} />
            <p>This movie was rated as {movieRating} stars</p>
        </div>
    )
}