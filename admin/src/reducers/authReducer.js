import { IS_AUTHENTICATED } from "../helpers/constants";

const initialState = {
  auth: false,
};
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        auth: !state.auth,
      };
    default:
      return state;
  }
}
