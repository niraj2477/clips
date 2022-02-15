import axios from "axios";

export const getCategory = async () => {
  try { 
  return await axios({
    method: "get",
    url: "http://localhost:5000/category/",
  
  });
}catch(error) { return error}
}