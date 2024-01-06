import {useState} from "react";

export default function Form({onAddItems}) {
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