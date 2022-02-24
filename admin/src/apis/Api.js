import axios from "axios";

let Api = axios.create({
  baseURL: "http://localhost:5000",
});
Api.defaults.withCredentials = true;
Api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
export default Api;
