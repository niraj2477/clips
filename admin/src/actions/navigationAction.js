import {
  HOME,
  SETTING,
  CATEGORY,
  FEEDBACK
} from "../helpers/constants";


export const isHome = () => {
  return { type: HOME };
};


export const isFeedback = () => {
  return { type: FEEDBACK };
};
export const isSetting = () => {
  return { type: SETTING };
};
export const isCategory = () => {
  return { type: CATEGORY };
};

