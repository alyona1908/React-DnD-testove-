import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from "redux-thunk";

//reducers
import tableReducer from "../store/reducers/table"

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const store = createStore(
    combineReducers(
        {
            table: tableReducer,
        }
    ),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;