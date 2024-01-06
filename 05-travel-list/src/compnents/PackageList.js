import {useState} from "react";
import Item from "./Item";

export default function PackingList({items, onDeleteItem, onToggleItem, onClearList}) {
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
                <button onClick={onClearList}>Clear list</button>
            </div>
        </div>
    );
}
