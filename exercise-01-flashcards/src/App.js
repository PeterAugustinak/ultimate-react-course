import "./styles.css";
import {useState} from "react";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript"
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components"
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX"
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props"
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook"
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element"
  }
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(questionId) {
    // conditional here solving the click on already turned card to turned it back
    setSelectedId(questionId !== selectedId ? questionId : null);
  }

  return (
      <div className="flashcards">
        {questions.map((question) => (
            <div
                key={question.id}
                className={question.id === selectedId ? 'selected' : ''}
                // we don't need to be a button when we want to "click" on object
                // as we cannot call the function here but we need param, here is hack:
                onClick={() => handleClick(question.id)}
            >
              <p>{question.id === selectedId ? question.answer : question.question}</p>
            </div>
            ))
        }
    </div>
  );
}
