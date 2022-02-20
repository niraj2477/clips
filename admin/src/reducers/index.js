import { combineReducers } from "redux";
import themeReducer from "./themeReducer";
import navigationReducer from "./navigationReducer";
import authReducer from "./authReducer";
const reducers = combineReducers({
  theme: themeReducer,
  navigation: navigationReducer,
  auth: authReducer
});

export default reducers;
