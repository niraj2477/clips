import axios from "axios";

export const getChannel = async (user) => {
  try {
    return await axios.get("http://localhost:5000/channel/getChannel", {
      params: {
        user: user,
      },
    });
  } catch (error) {
    return error;
  }
};
