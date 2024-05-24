import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";

function Header() {
    return (
        <header className="bg-yellow-500 uppercase">
            <Link to="/" className="tracking-widest">Fast React Pizza co.</Link>
            <SearchOrder/>
            <p>Hello!</p>
        </header>
    );
}

export default Header;