import axios from "axios";

export const getCategory = async () => {
  try {
    return await axios({
      method: "get",
      url: "http://localhost:5000/category/",
    });
  } catch (error) {
    return error;
  }
};

export const addCategory = async (name) => {
  try {
    // return await axios({
    //   method: "post",
    //   url: "http://localhost:5000/category/addCategory",
    //   data: data,
    // });
    return await axios.get("http://localhost:5000/category/addCategory", {
      params: { name: name },
    });
  } catch (error) {
    return error;
  }
};

export const deleteCategory = async (id) => {
  try {
    return await axios.get("http://localhost:5000/category/deleteCategory", {
      params: {
        id: id,
      },
    });
  } catch (error) {
    return error;
  }
};
