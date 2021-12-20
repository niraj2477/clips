import { combineReducers } from "redux";
import themeReducer from "./themeReducer";
import navigationReducer from "./navigationReducer";
const reducers = combineReducers({
  theme: themeReducer,
  navigation: navigationReducer
});

export default reducers;
