import axios from "axios";

export const videoUpload = async (data) => {
  try {
    return await axios({
      method: "post",
      url: "http://localhost:5000/video/videoUpload",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
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
  } catch (error) {
    return error;
  }
};

export const watch = async (v) => {
  try {
    return await axios.post("http://localhost:5000/video/watch", {
      v: v,
    });
  } catch (error) {
    return error;
  }
};

export const fetchVideo = async (filePath) => {
  try {
    return await axios.get(
      "http://localhost:5000/video/fetchVideo",
      {
        params: {
          filePath: filePath,
        },
      },
      {
        headers: {
          "Content-Range": "bytes=100-200",
          Range: "bytes=100-200",
          "Content-Type": "video/mp4",
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const watchComplete = async (v) => {
  try {
    return await axios.get("http://localhost:5000/video/watchComplete", {
      params: {
        v: v,
      },
    });
  } catch (error) {
    return error;
  }
};

export const like = async (v) => {
  try {
    return await axios.get("http://localhost:5000/video/like", {
      params: {
        v: v,
      },
    });
  } catch (error) {
    return error;
  }
};
