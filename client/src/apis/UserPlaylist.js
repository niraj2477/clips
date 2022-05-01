import axios from "axios";


export const addPlaylist = async (id,name) => {
    try { 
        return await axios({
          method: "get",
          url: "http://localhost:5000/playlist/addPlaylist",
          params: {
            id:id,
            name:name
          },
        });
      }catch(error) { return error}
  };


  export const fetchPlaylist = async (id) => {
    try { 
        return await axios({
          method: "get",
          url: "http://localhost:5000/playlist/getPlaylist",
          params: {
            id:id,
          },
        });
      }catch(error) { return error}
  };

  export const addVideoToPlaylist = async (playlistId,videoId) => {
    try { 
        return await axios({
          method: "get",
          url: "http://localhost:5000/playlist/addVideoToPlaylist",
          params: {
            playlistId:playlistId,
            videoId:videoId,
          },
        });
      }catch(error) { return error}
  };

  export const PlaylistVideoFun = async (playlistId) => {
    try { 
        return await axios({
          method: "get",
          url: "http://localhost:5000/playlist/fetchVideo",
          params: {
            playlistId:playlistId,
          },
        });
      }catch(error) { return error}
  };