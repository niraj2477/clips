import axios from "axios";

export const getCategory = async () => {
  try { 
  return await axios({
    method: "get",
    url: "http://localhost:5000/category/",
  
  });
}catch(error) { return error}
}


export const deleteCategory = async (id) => {
  try { 
    return await axios.get(
      "http://localhost:5000/category/deleteCategory",
      {
        params: {
          id: id,
        },
      },
     
    );
}catch(error) { return error}
}