import {useState} from "react";

export default function App() {
    // as siblings components Form and PackageList needs to operate with items,
    // state was "lifted" here, so now handleAddItem function is set to Form component
    // whereas items list and Toggle/Delete handlers are sent to PackageList component

    // items state
    const [items, setItems] = useState([]);

    // functions to manipulate item within items list
    function handleAddItem(item) {
        // adding new value is done by extension of the list by original list and new item
        setItems((items) => [...items, item] );
    }

    function handleDeleteItem(id) {
        // deleting is executed by filtering out the item to delete from the items list
        // that means we create new list with all items but the filtered one
        setItems((items) => items.filter(item => item.id !== id));
    }

    function handleToggleItem(id) {
        // updating of specific attribute of the item is done by finding specific item
        // using map, then changing attribute to opposite value and then adding
        // the original item values + new value into the object
        setItems((items) => items.map(
            item => item.id === id ? {...item, packed: !item.packed} : item))
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItem}/>
            <PackagingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
            />
            <Stats items={items}/>
        </div>
    )
}

function Logo() {
    return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({onAddItems}) {
    const defaultQuantity = 1;
    const defaultDescription = "";

    const [quantity, setQuantity] = useState(defaultQuantity);
    const [description, setDescription] = useState(defaultDescription);

    function handleSubmit(e) {  // typical name of form submitting function, e = event
        e.preventDefault(); // preventing reload of the page on submit
        // form is blocked from submit if the description is not provided
        if (!description) return;

        // creating new object based on state values
        const newItem = { description, quantity, packed: false, id: Date.now() };
        console.log(newItem);

        // now newly added item is handled, so it can be stored and displayed
        onAddItems(newItem);

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

function PackagingList({items, onDeleteItem, onToggleItem}) {
    const [sortBy, setSortBy] = useState("input")

    // as this variable is going to be changed we use `let` instead of `const`
    let sortedItems; // `sortedItems` is actually derived state

    if(sortBy === "input") sortedItems = items;
    if(sortBy === "description") sortedItems = items
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));
    if(sortBy === "packedStatus") sortedItems = items
        .slice()
        .sort((a, b) => Number(b.packed) - Number(a.packed));

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        onDeleteItem={onDeleteItem}
                        onToggleItem={onToggleItem}
                        key={item.id}/>
                    ))}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                    <option value="input">Sort by the input order</option>
                    <option value="description">Sort by the description</option>
                    <option value="packedStatus">Sort by the packed status</option>
                </select>
            </div>
        </div>
    );
}

function Item({item, onDeleteItem, onToggleItem}) {
    // it is crucial to call delete/toggle function with `() =>` - this way the function
    // is called only when event is happening
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => {onToggleItem(item.id)}}
            />
            <span style={item.packed ? { textDecoration: "line-through"}: {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Stats({items}) {
    // if no items are in the list yet, calculation does not need to be performed, and
    // we can return different message into the footer
    if(!items.length) return (
        <p className="stats">
            <em>Start packing yourself!</em>
        </p>
    )

    const itemsCount = items.length
    const packedItems = items.filter((items) => items.packed).length
    const percentagePacked = Math.round((packedItems / itemsCount) * 100)

    return (
        <footer className="stats">
            <em>
                {
                    percentagePacked === 100 ?
                        `You got all ${itemsCount} stuff packed so you are ready to go!` :
                        `You have ${itemsCount} items on your list, and you already 
                        packed ${packedItems} (${percentagePacked}%)`
                }
            </em>
      </footer>
    )
}
