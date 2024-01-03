export default function Item({item, onDeleteItem, onToggleItem}) {
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
