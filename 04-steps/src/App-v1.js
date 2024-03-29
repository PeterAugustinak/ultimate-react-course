import {useState} from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];


export default function AppV1() {
  return (
      <div>
        <Steps />
        <Steps />
      </div>
  )
}

function Steps() {
  const [step, setStep] = useState(1); // it sets initial value
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if(step > 1) {
      setStep((currenStep) => currenStep - 1);
    }
  }

  function handleNext() {
    if(step < 3) {
      setStep((currenStep) => currenStep + 1);
    }
  }

  return (
  <div>
    <button className="close" onClick={
      () => setIsOpen((open) => !open)}>&times;
    </button>

    {isOpen && (
      <div className="steps">
        <div className="numbers">
          <div className={step >= 1 ? "active" : ""}>1</div>
          <div className={step >= 2 ? "active" : ""}>2</div>
          <div className={step >= 3 ? "active" : ""}>3</div>
        </div>

        <p className="message">Step {step}: {messages[step-1]}</p>

        <div className="buttons">
          <button
              style={{backgroundColor: "#7950f2", color: "#fff"}}
              onClick={handlePrevious}  // must be just stated, not called directly
          >
            Previous
          </button>

          <button
              style={{backgroundColor: "#7950f2", color: "#fff"}}
              onClick={handleNext}  // must be just stated, not called directly
          >
            Next
          </button>

        </div>
      </div>
      )}
  </div>
  )
}
