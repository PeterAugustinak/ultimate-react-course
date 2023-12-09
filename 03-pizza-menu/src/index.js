import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

const openHour = 12;
const closeHour = 22;


function App() {
    return (
    <div className="container">
        <Header />
        <Menu />
        <Footer />
    </div>

    )
}

function Header() {
    // const style = {color: "red", fontSize: "46px", textTransform: "uppercase"}
    const style = {}
    return (
        <header className="header">
            <h1 style={style} className="header">Fast React Pizza Co.</h1>
        </header>
    )
}


function Menu() {
    return (
        <main className="menu">
            <h2>Our menu</h2>
            <Pizza
                name='Pizza Spinaci'
                ingredient='Tomato, Spinacci'
                photoName='pizzas/spinaci.jpg'
                price={12}
            />
            <Pizza
                name='Pizza Vegana'
                ingredient='Tomato, Spinacci, Vegan Cheese'
                photoName='pizzas/funghi.jpg'
                price={10}
            />
        </main>
    )
}

function Pizza(props) {
  return (
      <div className="pizza">
        <img src={props.photoName} alt={props.name}/>
          <div>
              <h3>{props.name}</h3>
              <p>{props.ingredient}</p>
              <span>{props.price + 3}</span>
          </div>
      </div>
  )
}


function Footer() {
    const currentTime = new Date().toLocaleTimeString()

    return <footer className="footer">It's {currentTime}. We're currently {getOpenStatus()}!</footer>
}

function getOpenStatus() {
    const hour = new Date().getHours();

    const isOpen = hour >= openHour && hour <= closeHour
    if (isOpen) {
        return "open";
    }
    else {
        return "closed";
    }
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
