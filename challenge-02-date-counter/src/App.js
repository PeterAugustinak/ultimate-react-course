import {useState} from "react";


export default function App() {
  return (
      <div>
        <Counter />
      </div>
  )
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(1);

  // step handlers
  function handleStepBackward() {
      if(step>1) {
          setStep((step) => step - 1);
      }
}
  function handleStepForward() {
      setStep((step) => step + 1);
  }

  // count handlers
  function handleCountBackward() {
      setCount((count) => count - 1);
  }
  function handleCountForward() {
      setCount((count) => count + 1);
  }

  // compute sum value from today
  const fromToday = step * count

  // compute and format date
    const currentDate = new Date();
  const modifiedDate = new Date(currentDate);
  modifiedDate.setDate(currentDate.getDate() + fromToday);

  const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

  const displayDate = new Date(modifiedDate).toLocaleDateString(
        'en-US', options
  );

  return (
      <>
          <div className="counter">
              <Btn arrow="-" handle={handleStepBackward}></Btn>
              <p>Step: <b>{step}</b></p>
              <Btn arrow="+" handle={handleStepForward}></Btn>
          </div>

          <div className="counter">
              <Btn arrow="-" handle={handleCountBackward}></Btn>
                <p>Count: <b>{count}</b></p>
              <Btn arrow="+" handle={handleCountForward}></Btn>
          </div>

          <div className="counter">
              <h3>{fromToday} day(s) from today is {displayDate}</h3>
          </div>
      </>
  )
}

function Btn({arrow, handle: handler}) {
    return (
        <div className="buttons">
          <button
              style={{backgroundColor: "#7950f2", color: "#fff"}}
              onClick={handler}
          >
          {arrow}
         </button>
    </div>
    )
  }
