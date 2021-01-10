import { combineReducers } from "redux";
import app from "./app"
import user from "./user";
import room from "./room";
import activities from "./activities";

const appReducer = combineReducers({
    app,
    user,
    room,
    activities,
})

const rootReducer = (state, action) => appReducer(state,action)

export default rootReducer;
