import { compose } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers } from 'redux';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import Cookie from 'js-cookie';
 
const cartItems = Cookie.getJSON('cartItems') || [];

const initialState = { cart: { cartItems } };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
