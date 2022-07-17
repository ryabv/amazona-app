import { useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
    const { id } = useParams();
    const { search } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const qty = Number(search.split('=')[1]) || 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty));
        }
    }, [dispatch, id, qty]);

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler = () => {
        history.push('/signin?redirect=shipping');
    }

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping cart</h3>
                        <div>Price</div>
                    </li>

                    {!cartItems.length ? (
                        <div>Cart is empty</div>
                    ) : cartItems.map((item => (
                        <li key={item.product}>
                            <div className="cart-image">
                                <img src={item.image} alt="product" />
                            </div>

                            <div className="cart-name">
                                <div>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                </div>
                                <div>
                                    Qty:
                                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map((i) => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>

                                    <button className="button" onClick={() =>removeFromCartHandler(item.product)}>Delete</button>
                                </div>
                            </div>

                            <div className="cart-price">${item.price}</div>
                        </li>
                    )))}
                </ul>
            </div>

            <div className="cart-action">
                <h3>
                    Subtotal ({cartItems.reduce((acc, c) => acc + Number(c.qty), 0)} items): ${cartItems.reduce((acc, c) => acc + c.price * c.qty, 0)}
                </h3>

                <button className="button primary full-width" disabled={cartItems.length} onClick={checkoutHandler}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default CartScreen;
