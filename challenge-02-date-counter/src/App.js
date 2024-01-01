import {useState} from "react";


export default function App() {
  return (
      <div>
        <h2>Standard counter</h2>
        <Counter />
          <br/>
        <h2>Event driven counter</h2>
        <CounterEventDriven />
      </div>
  )
}


// lesson 68
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
  const displayDate = getDisplayDate(fromToday);

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


// lesson 76 - event driven
function CounterEventDriven() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(1);


  // count handlers
  function handleCountBackward() {
      setCount((count) => count - 1);
  }
  function handleCountForward() {
      setCount((count) => count + 1);
  }
  function handleReset() {
      setStep(1);
      setCount(1);
  }

  const fromToday = step * count
  const displayDate = getDisplayDate(fromToday);

  return (
      <>
          <div className="counter">
              Step: 
              <input
                  type="range"
                  min="1"
                  max="10"
                  onChange={(e) => setStep(Number(e.target.value))}
              />
              {step}
          </div>

          <div className="counter">
              <Btn arrow="-" handle={handleCountBackward}></Btn>
              <input
                  type="text"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}/>
              <Btn arrow="+" handle={handleCountForward}></Btn>
          </div>

          <div className="counter">
              <h3>{fromToday} day(s) from today is {displayDate}</h3>
          </div>

          {(step !== 1 || count !== 1) ?
              <div className="buttons">
              <button
              style={{backgroundColor: "#7950f2", color: "#fff"}}
              onClick={handleReset}
              >
              Reset
              </button>
              </div> : null
          }
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


function getDisplayDate(fromToday) {
    const currentDate = new Date();
    const modifiedDate = new Date(currentDate);
    modifiedDate.setDate(currentDate.getDate() + fromToday);

  const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new Date(modifiedDate).toLocaleDateString(
        'en-US', options
    )
  }
