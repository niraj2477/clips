import {
  HOME,
  SETTING,
  CATEGORY,
} from "../helpers/constants";


export const isHome = () => {
  return { type: HOME };
};
export const isSetting = () => {
  return { type: SETTING };
};
export const isCategory = () => {
  return { type: CATEGORY };
};

