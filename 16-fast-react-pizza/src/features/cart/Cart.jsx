import LinkButton from "../../ui/LinkButton.jsx";
import Button from "../../ui/Button.jsx";
import CartItem from "./CartItem.jsx";
import {useDispatch} from "react-redux";
import {clearCart, getCart} from "./cartSlice.js";
import {getUsername} from "../user/userSlice.js";
import EmptyCart from "./EmptyCart.jsx";

function Cart() {
    const cart = getCart;
    const username = getUsername();
    const dispatch = useDispatch();

    if (!cart.length) return <EmptyCart/>;


    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>
            <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

            <ul className="divide-y divide-stone-200 border-b
            mt-3">
                {cart.map((item) => (
                    <CartItem item={item} key={item.key}/>
                ))}
            </ul>

            <div className="mt-6 space-x-2">
                <Button to="/order/new" type="primary">Order pizzas</Button>
                <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear cart</Button>

            </div>
        </div>
    );
}

export default Cart;
