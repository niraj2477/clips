import axios from "axios";


export const getHistory = async (id) => {
    try { 
        return await axios({
          method: "get",
          url: "http://localhost:5000/history/getHistory",
          params: {
            id:id,
          },
        });
      }catch(error) { return error}
  };