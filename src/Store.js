import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducers, { navMiddleware } from "./Reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(thunk, navMiddleware));

const Store = createStore(Reducers, middlewares);

export default Store;
