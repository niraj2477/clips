import axios from "axios";

export const authenticate = async (data) => {
  try {
    return await axios.post("http://localhost:5000/authenticate", {
      data
    });
  } catch (error) {
    return error;
  }
};
