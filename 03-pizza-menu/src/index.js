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

const openHour = 8;
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

            {pizzaData.length > 0 ? (
            <>
                <p>
                    This is the best pizza in the whole funcking world.
                </p>
                <ul className="pizzas">
                    {pizzaData.map((pizza) => (
                        <Pizza pizzaObj={pizza} key={pizza.name}></Pizza>
                    ))}
                </ul>
            </>
            ) : <p>We are still working on our menu, come back later please.</p>
            }



            {/*<Pizza*/}
            {/*    name='Pizza Spinaci'*/}
            {/*    ingredient='Tomato, Spinacci'*/}
            {/*    photoName='pizzas/spinaci.jpg'*/}
            {/*    price={12}*/}
            {/*/>*/}
            {/*<Pizza*/}
            {/*    name='Pizza Vegana'*/}
            {/*    ingredient='Tomato, Spinacci, Vegan Cheese'*/}
            {/*    photoName='pizzas/funghi.jpg'*/}
            {/*    price={10}*/}
            {/*/>*/}
        </main>
    )
}

function Pizza({pizzaObj}) {
    // if(pizzaObj.soldOut) return null;

      return (
          <div className={`pizza ${pizzaObj.soldOut ? "sold-out": ""}`}>
            <img src={pizzaObj.photoName} alt={pizzaObj.name}/>
              <li>
                  <h3>{pizzaObj.name}</h3>
                  <p>{pizzaObj.ingredients}</p>
                  <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price + 3}</span>
              </li>
          </div>
      )
    }


function Footer() {
    const hour = new Date().getHours();
    const isOpen = hour >= openHour && hour <= closeHour

    return (
        <footer className="footer">
            {(isOpen && pizzaData.length > 0) ? (
                <Order />
            ) : (
                    <p>
                        We are closed now. Happy to welcome you between {openHour}:00 and {closeHour}:00
                    </p>
                )}
        </footer>
    );
}

function Order() {
    return (
                <div className="order">
                <p>We're open until {closeHour}:00. Come visit us or order online:</p>
                <button className="btn">Order</button>
            </div>
    )
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
