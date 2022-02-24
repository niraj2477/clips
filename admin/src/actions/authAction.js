import { IS_AUTHENTICATED } from "../helpers/constants";

export const isAuthenticated = () => {
  return { type: IS_AUTHENTICATED };
};

