import axios from "axios";

const API = axios.create({
  baseURL: "https://one-play-sports-assignment.onrender.com"
});

export default API;