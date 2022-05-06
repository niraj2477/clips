import axios from "axios";

export const addFeedback = async (data) => {
    try {
      return await axios({
        method: "post",
        url: "http://localhost:5000/feedback/addFeedback",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      return error;
    }
  };