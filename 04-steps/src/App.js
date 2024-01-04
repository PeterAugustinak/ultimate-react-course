import {useState} from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];


export default function App() {
  return (
      <div>
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


        <StepMessage step={step}>
          {messages[step -1]}

          <div className="buttons">
            <Button
                textColor="#000"
                bgColor="grey"
                onClickHandler={() => alert(`Learn how to ${messages[step-1]}`)}
                >
              <h3>Learn how</h3>
            </Button>
          </div>
        </StepMessage>



        <div className="buttons">
          <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClickHandler={handlePrevious}
              >
            <span>👈🏻</span>Previous
          </Button>

          <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClickHandler={handleNext}
              >
            Next<span>👉🏻</span>
          </Button>

        </div>
      </div>
      )}
  </div>
  )
}

function StepMessage({step, children}) {
  return (
      <div className="message">
        <h3>Step {step}</h3>
        {children}
      </div>
  );
}

// children attr - predefined Ract keyword which is taking data between component
// opening and closing tag
function Button({textColor, bgColor, onClickHandler, children}) {
  return (
          <button
              style={{backgroundColor: bgColor, color: textColor}}
              onClick={onClickHandler}  // must be just stated, not called directly
          >
            {children}
          </button>
  );
}
