import {useState} from "react";


export default function App() {
    const [bill, setBill] = useState(0);
    const [service, setService] = useState(0);
    const [friendService, setFriendService] = useState(0);

    function handleReset() {
        setBill(0);
        setService(0);
        setFriendService(0);
    }

    const tip = bill / 100 * ((service + friendService) / 2)
    const total = bill + tip

    return (
        <div>
            <Form
                bill={bill}
                onSetBill={setBill}
                onSetService={setService}
                onSetFriendService={setFriendService}
            />
            {bill > 0 && (
            <>
                <Output bill={bill} tip={tip} total={total}/>
                <Reset onReset={handleReset}/>
            </>
            )}
        </div>
    )
}


export function Form({bill, onSetBill, onSetService, onSetFriendService}) {

    return (
        <div>
            <BillInput bill={bill} onSetBill={onSetBill}>
                How much was the bill?
            </BillInput>

            <SelectPercentage onSelect={onSetService}>
                How did you like the service?
            </SelectPercentage>

            <SelectPercentage onSelect={onSetFriendService}>
                How much your friends like the service?
            </SelectPercentage>

            <hr/>
        </div>
    )
}


export function BillInput({bill, onSetBill, children}) {
    return (
        <div>
            <label>{children} </label>
            <input
                type="text"
                value={bill}
                onChange={e=>onSetBill(Number(e.target.value))}/>
        </div>
    )
}


export function SelectPercentage({onSelect, children}) {
    return (
        <div>
            <label>{children} </label>
            <select onChange={e=>onSelect(Number(e.target.value))}>
                <option value="0">Dissatisfied (0%)</option>
                <option value="5">It was okay (5%)</option>
                <option value="10">It was good (10%)</option>
                <option value="20">Absolutely amazing (20%)</option>
            </select>
        </div>
    )
}


export function Output({bill, tip, total}) {
    return (
        <div>
            <p>
                <strong>You pay ${total} </strong>
                (${bill} bill + ${tip} tip)
            </p>
        </div>
    )
}


export function Reset({onReset}) {
    return (
        <button onClick={onReset}>Reset</button>
    )
}
