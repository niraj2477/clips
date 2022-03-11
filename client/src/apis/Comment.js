import axios from "axios";

export const addComment = async (data) => {
    try {
      return await axios.post("http://localhost:5000/comment/addComment", {
        data
      });
    } catch (error) {
      return error;
    }
  };
