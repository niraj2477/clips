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


  export const getComments = async () => {
    try { 
    return await axios({
      method: "get",
      url: "http://localhost:5000/comment/",
    
    });
  }catch(error) { return error}
  }
  