import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
    return <img className="avatar" src="/salamino.jpg" alt="Avatar"/>
}

function Intro() {
    return (
        <p>
            These are my skills about the web technologies.
            Some of them are backend, some of them are frontend.
            Some of them I know more, some of them less.
        </p>
    )
}

function SkillList() {
    return (
        <div className="skill-list">
            <Skill
                name="JavaScript"
                bgColor="red"
                emoji="🫸"
            />
            <Skill
                name="React"
                bgColor="blue"
                emoji="👈"
            />
            <Skill
                name="Django"
                bgColor="purple"
                emoji="✊"
            />
            <Skill
                name="GraphQL"
                bgColor="green"
                emoji="🤘"
            />
            <Skill
                name="Celery"
                bgColor="brown"
                emoji="🤛"
            />

        </div>
    )
}

function Skill(props) {
    return (
        <div className="skill" style={{backgroundColor: props.bgColor}}>
            <span>{props.name}</span>
            <span>{props.emoji}</span>
        </div>
    )
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
