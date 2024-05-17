import {Link} from "react-router-dom";

function Header() {
    return (
        <header>
            <Link to="/">Fast React Pizza co.</Link>
            <p>Hello!</p>
        </header>
    );
}

export default Header;