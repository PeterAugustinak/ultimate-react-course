import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";


const StyledApp = styled.div`
    background-color: orangered;
    padding: 20px;
`

function App() {
    return (
        <>
            <GlobalStyles/>
            <StyledApp>
                <Heading as="h1">The Wild Oasis</Heading>
                <Heading as="h2">The Wild Oasis</Heading>
                <Heading as="h3">
                    <Button onClick={() => alert("Check in")}>Check In</Button>
                    <Button onClick={() => alert("Check out")}>Check Out</Button>
                </Heading>
                <Input type="number" placeholder="Number of guests"/>
            </StyledApp>
        </>
    );
}

export default App;