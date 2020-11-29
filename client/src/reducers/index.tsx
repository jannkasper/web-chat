import { combineReducers } from "redux";
import app from "./app"

const appReducer = combineReducers({
    app
})

const rootReducer = (state, action) => appReducer(state,action)

export default rootReducer;
