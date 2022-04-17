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
  CREATOR
} from "../helpers/constants";


export const isHome = () => {
  return { type: HOME };
};

export const isSubscriptions = () => {
  return { type: SUBCRIPTIONS };
};
export const isCreator = () => {
  return { type: CREATOR };
};
export const isTrending = () => {
  return { type: TRENDING };
};
export const isHelp = () => {
  return { type: HELP };
};
export const isSetting = () => {
  return { type: SETTING };
};

export const isGaming = () => {
  return { type: GAMING };
};
export const isLibrary = () => {
  return { type: LIBRARY };
};
export const isHistory = () => {
  return { type: HISTORY };
};
export const isLearning = () => {
  return { type: LEARNING };
};
export const isFeedback = () => {
  return { type: FEEDBACK };
};
export const isYourVideos = () => {
  return { type: YOURVIDEOS };
};
