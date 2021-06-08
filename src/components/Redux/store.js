import {createStore,combineReducers,applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"
import {AuthReducer} from "./Reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default()=>{
    const store=createStore(
        combineReducers({
            Auth:AuthReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
  return store
}