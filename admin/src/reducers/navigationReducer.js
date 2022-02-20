import {
  HOME,

  SETTING,
  CATEGORY,

} from "../helpers/constants";

const initialState = {
  selected: HOME,
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case HOME:
      return {
        selected: HOME,
      };
   
  
    case SETTING: {
      return {
        selected: SETTING,
      };
    }
    case CATEGORY: {
      return {
        selected: CATEGORY,
      };
    }
  
    default:
      return state;
  }
}
