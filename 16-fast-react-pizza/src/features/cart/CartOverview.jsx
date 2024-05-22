import {Link} from "react-router-dom";

function CartOverview() {
    return (
        <>
            <p>
                <span>23 pizzas</span>
                <span>$23.45</span>
            </p>
            <Link to='/cart'> Open cart</Link>
        </>
    );
}

export default CartOverview;
