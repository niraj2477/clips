import {  IS_DARK } from "../helpers/constants";
import { loadTheme, saveTheme } from "../helpers/localStorage";
const initialState = {
  isDark: loadTheme(),
};

export default function themeReducer (state = initialState, action) {
  switch (action.type) {
    case IS_DARK:
      saveTheme(!state.isDark);
      return {
        isDark: !state.isDark,
      };
    default:
      return state;
  }
}
