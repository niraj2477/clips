import {
  HOME,
  SUBCRIPTIONS,
  TRENDING,
  HELP,
  SETTING,
  GAMING,
  LIBRARY,
  HISTORY,
  LEARNING,
  FEEDBACK,
  YOURVIDEOS,
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
    case SUBCRIPTIONS:
      return {
        selected: SUBCRIPTIONS,
      };
    case LIBRARY:
      return {
        selected: LIBRARY,
      };
    case HISTORY: {
      return {
        selected: HISTORY,
      };
    }
    case SETTING: {
      return {
        selected: SETTING,
      };
    }
    case TRENDING: {
      return {
        selected: TRENDING,
      };
    }
    case HELP: {
      return {
        selected: HELP,
      };
    }
    case GAMING: {
      return {
        selected: GAMING,
      };
    }
    case LEARNING: {
      return {
        selected: LEARNING,
      };
    }
    case FEEDBACK: {
      return {
        selected: FEEDBACK,
      };
    }
    case YOURVIDEOS: {
      return {
        selected: YOURVIDEOS,
      };
    }
    default:
      return state;
  }
}
