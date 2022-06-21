import { combineReducers } from "redux"
import { authReducer } from "./auth"
import { globalReducer } from "./global";
import { recipeReducer } from "./recipe";

const reducer = combineReducers({
    authReducer: authReducer,
    globalReducer: globalReducer,
    recipeReducer: recipeReducer
});

export default reducer;