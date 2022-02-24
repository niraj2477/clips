import axios from "axios";

export const getCategory = async () => {
  try { 
  return await axios({
    method: "get",
    url: "http://localhost:5000/category/",
  
  });
}catch(error) { return error}
}


export const addCategory = async (data) => {
  console.log(data)
  try { 
    return await axios.post("http://localhost:5000/category/addCategory", {
      data
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