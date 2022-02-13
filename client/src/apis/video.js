import axios from "axios";

export const videoUpload = async (data) => {
  try {
    return await axios({
      method: "post",
      url: "http://localhost:5000/video/videoUpload",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
  } catch (error) {
    return error;
  }
};

export const indexPage = async (v) => {
  try { 
  return await axios({
    method: "post",
    url: "http://localhost:5000/video/",
    data: v,
  });

  }catch(error) { return error}
}