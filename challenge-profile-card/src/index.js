import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const skillsData = [
    {
        name: "JavaScript",
        level: "advanced",
        bgColor: "red",
    },
    {
        name: "Python",
        level: "advanced",
        bgColor: "blue",
    },
    {
        name: "React",
        level: "intermediate",
        bgColor: "green",
    },
    {
        name: "GraphQL",
        level: "advanced",
        bgColor: "yellow",
    },
    {
        name: "Svelte",
        level: "beginner",
        bgColor: "brown",
    },
];


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
            {skillsData.map((skill) => (
                <Skill name={skill.name} color={skill.bgColor} level={skill.level}>
                </Skill>
                ))}
        </div>
    );
}

function Skill({name, color, level}) {
    return (
        <div className="skill" style={{backgroundColor: color}}>
            <span>{name}</span>
            <span>{level === "beginner" && "🤚🏻"}</span>
            <span>{level === "intermediate" && "👌🏻"}</span>
            <span>{level === "advanced" && "💪🏻"}</span>
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
