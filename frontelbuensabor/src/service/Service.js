import axios from "axios";

var serverUrl = "http://localhost:9001/buensabor";
var responseEntity = [];
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
    await axios
      .get(serverUrl + "/" + subPath + "/", config)
      .then((response) => (responseEntity = response.data))
      .catch((error) => console.log(error));
    return responseEntity;
  }
  
  async getOne(subPath, id) {
    await axios
      .get(serverUrl + "/" + subPath + "/" + id, config)
      .then((response) => (responseEntity = response.data))
      .catch((error) => console.log(error));
    return responseEntity;
  }

  async save(subPath, entity) {
    try {
      let response = await axios.post(serverUrl + "/" + subPath + "/", entity, config);
      return response.data;

    } catch (error) {
      console.log(error);
    }
  }

  async update(subPath, entity, id) {
    try {
      await axios
        .put(serverUrl + "/" + subPath + "/" + id, entity, config)
        .then((response) => (responseEntity = response.data))
        .catch((error) => console.log(error));
      return this.getOne(subPath, id);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(subPath, id) {
    try {
      await axios
        .delete(serverUrl + "/" + subPath + "/" + id, config)
        .then((response) => (this.responseEntity = response.status))
        .catch((error) => console.log(error));
      return this.responseEntity;
    } catch (error) {
      console.log(error);
    }
  }
}
