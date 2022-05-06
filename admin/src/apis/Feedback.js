import axios from "axios";

export const getFeedback = async () => {
  try {
    return await axios({
      method: "get",
      url: "http://localhost:5000/feedback/getFeedback",
    });
  } catch (error) {
    return error;
  }
};
