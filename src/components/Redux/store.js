import {createStore,combineReducers,applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"
import {authReducer,suggestionReducer} from "./Reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default()=>{
    const store=createStore(
        combineReducers({
            Auth:authReducer,
            Suggestions:suggestionReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
  return store
}