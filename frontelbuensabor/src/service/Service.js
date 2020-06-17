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
  async getOne(subPath, id) {
    try {
      let response = await axios.get(
        serverUrl + "/" + subPath + "/" + id,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async save(subPath, entity, id) {
    try {
      await axios.post(serverUrl + "/" + subPath + "/", entity, config);
      return this.getOne(subPath, id);
    } catch (error) {
      console.log(error);
    }
  }

  async update(subPath, entity, id) {
    try {
      await axios.put(serverUrl + "/" + subPath + "/" + id, entity, config);
      return this.getOne(subPath, id);
    } catch (error) {
      console.log(error);
    }
  }
}
