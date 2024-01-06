import {useState} from "react";


export default function App() {
    const [bill, setBill] = useState(0);
    const [service, setService] = useState(10);
    const [friendService, setFriendService] = useState(10);

    function handleSetBill(value) {
        setBill(value);
    }

    function handleSetService(value) {
        setService(value);
    }

    function handleSetFriendService(value) {
        setFriendService(value);
    }

    var tip = bill / 100 * (Number(service) + Number(friendService))
    var total = Number(bill) + tip

    return (
        <div>
            <Form
                bill={bill}
                onSetBill={handleSetBill}
                onSetService={handleSetService}
                onSetFriendService={handleSetFriendService}
            />
            <Count bill={bill} tip={tip} total={total} onReset={setBill}/>
        </div>
    )
}


export function Form({bill, onSetBill, onSetService, onSetFriendService}) {

    return (
        <div>
            <FormItem
                bill={bill}
                onSetBill={onSetBill}
                question="How much was the bill?"
            />
            <FormItemChoice
                onSet={onSetService}
                question="How did you like the service?"
            />
            <FormItemChoice
                onSet={onSetFriendService}
                question="How much your friends like the service?"
            />
            <hr/>
        </div>
    )
}

export function FormItem({bill, onSetBill, question}) {
    return (
        <div>
            <p>
                {question} <input type="text" value={bill} onChange={e=>onSetBill(e.target.value)}/>
            </p>

        </div>
    )
}

export function FormItemChoice({onSet, question}) {
    return (
        <div>
            <p>{question} <select onChange={e=>onSet(e.target.value)}>
                <option value="0">Dissatisfied (0%)</option>
                <option value="5">It was okay (5%)</option>
                <option value="10">It was good (10%)</option>
                <option value="20">Absolutely amazing (20%)</option>
            </select>
            </p>
        </div>
    )
}


export function Count({bill, tip, total, onReset}) {
    return (
        <div>
            <p>
                <strong>You pay ${total} </strong>
                (${bill} bill + ${tip} tip)</p>
            <button onClick={() => onReset("0")}>Reset</button>
        </div>
    )

}
