import { compose } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers } from 'redux';
import { productListReducer } from './reducers/productReducers';

const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
