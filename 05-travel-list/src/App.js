import {useState} from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Battery", quantity: 10, packed: true },
];

export default function App() {
    return (
        <div className="app">
            <Logo />
            <Form />
            <PackagingList />
            <Stats />
        </div>
)
}

function Logo() {
    return <h1>🏝️ Far Away 🧳</h1>;
}

function Form() {
    const defaultQuantity = 1;
    const defaultDescription = "";

    const [quantity, setQuantity] = useState(defaultQuantity);
    const [description, setDescription] = useState(defaultDescription);

    function handleSubmit(e) {  // typical name of form submitting function, e = event
        e.preventDefault(); // preventing reload of the page on submit
        // console.log(e)
        if (!description) return;

        // creating new object based on state values
        const newItem = { description, quantity, packed: false, id: Date.now() };
        console.log(newItem);

        // after form is submitted, we want to reset fields to default
        setQuantity(defaultQuantity)
        setDescription(defaultDescription)
    }

    // using handleSubmit on form is better than handleClick on button as this way it
    // also works with using ENTER
    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({length: 20}, (_, i) => i + 1).map
                ((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))

                }
            </select>
            <input
                type="text"
                placeholder="Item ..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>

        </form>
    );
}

function PackagingList() {
    return (
        <div className="list">
            <ul>
                {initialItems.map((item) => (
                    <Item item={item} key={item.id}/>
                    ))}
            </ul>
        </div>
    );
}

function Item({item}) {
    return (
        <li>
            <span style={item.packed ? { textDecoration: "line-through"}: {}}>
                {item.quantity} {item.description}
            </span>
            <button>❌</button>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>
                You have X items on your list, and you already packed X (X)
            </em>
      </footer>
    )
}
