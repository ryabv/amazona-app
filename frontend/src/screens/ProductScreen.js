import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { detailsProduct } from "../actions/productActions";

const ProductScreen = (props) => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;
    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(detailsProduct(id));
    }, [dispatch, id]);

    const handleAddToCart = () => {
        history.push(`/cart/${id}?qty=${qty}`);
    }

    return (
        <div>
            <div className="back-to-result">
                <Link to="/">Back to result</Link>
            </div>

            {loading && (<div>Loading...</div>)}

            {error && (<div>{error}</div>)}

            {!loading && !error && (
                <div className="details">
                    <div className="detauils-image">
                        <img src={product.image} alt="product" />
                    </div>

                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                {product.rating} Stars ({product.numReviews} Reviews)
                            </li>
                            <li>
                                Price: <b>${product.price}</b>
                            </li>
                            <li>
                                Description:
                                <div>
                                    {product.description}
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="details-action">
                        <ul>
                            <li>
                                Price: {product.price}
                            </li>
                            <li>
                                Status: {product.countInStock ? "In Stock" : "Unavailable."}
                            </li>
                            <li>
                                Qty: <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map((q) => (
                                        <option key={q} value={q + 1}>{q + 1}</option>
                                    ))}
                                </select>
                            </li>
                            <li>
                                {Boolean(product.countInStock) && (
                                    <button className="button primary" onClick={handleAddToCart}>Add to cart</button>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductScreen;

