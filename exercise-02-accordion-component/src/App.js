import "./index.css";
import {useState} from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs}/>
    </div>
  );
}

function Accordion({data}) {
        const [curOpen, setCurrOpen] = useState(null);

  return (
      <div className="accordion">
        {data.map((el, i) => (
            <AccordionItem
                currOpen={curOpen}
                onOpen={setCurrOpen}
                title={el.title}
                num={i}
                key={el.title}>
                {el.text}
            </AccordionItem>
                ))}

          <AccordionItem
                currOpen={curOpen}
                onOpen={setCurrOpen}
                title={"Specific question"}
                num={99}
                >
                Things to show:
                <ul>
                    <li>how you can</li>
                    <li>use the stuff</li>
                </ul>
            </AccordionItem>
      </div>
      )
}

function AccordionItem({currOpen, onOpen, num, title, children}) {
    const isOpen = num === currOpen;

    function handleToggle() {
        onOpen(isOpen ? null: num);
    }

  return (
      <div className={`item ${isOpen ? "open": ""}`} onClick={handleToggle}>
        <p className='number'>{num < 9 ? `0${num}` : num}</p>
        <p className='title'>{title}</p>
        <p className='icon'>{isOpen ? "-" : "+"}</p>

        {isOpen && <div className="content-box">{children}</div>}

      </div>
  )
}
