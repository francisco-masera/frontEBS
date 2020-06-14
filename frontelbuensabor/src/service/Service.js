import axios from "axios";

var serverUrl = "http://localhost:9001/buensabor";
const config = {
  headers: {
    "Content-type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origins": "*",
    "Access-Control-Allow-Methods": ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
    "Access-Control-Allow-Headers": "Content-Type",
    "cache-control": "no-cache",
  },
};

export default class Service {
  async getAll(subPath) {
    try {
      let response = await axios.get(serverUrl + "/" + subPath + "/", config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
