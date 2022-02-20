import axios from "axios";

export const userUpdate = async (data) => {
  console.log(data);
  try {
    return await axios.post("http://localhost:5000/user/update", {
      data
    });
  } catch (error) {
    return error;
  }
};
