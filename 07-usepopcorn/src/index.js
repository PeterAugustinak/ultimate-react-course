import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
import StarRating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <StarRating
        maxRating={5}
        messages={
            ['terrible', 'bad', 'good', 'very good', 'excellent']
        }
    />
    <StarRating maxRating={5} size={22} color="red" className="test"/>
  </React.StrictMode>
);
