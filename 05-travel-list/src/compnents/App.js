import {useState} from "react";

import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackageList";
import Stats from "./Stats";


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

    function handleClearList() {
        const confirmed  = window.confirm("Are you sure to remove all items from the list?");
        if(confirmed) setItems([]);
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItem}/>
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
                onClearList={handleClearList}
            />
            <Stats items={items}/>
        </div>
    )
}
