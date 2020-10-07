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
      .get(serverUrl + "/" + subPath + "/" + parseInt(id), config)
      .then((response) => (responseEntity = response.data))
      .catch((error) => console.log(error));
    return responseEntity;
  }

  async save(subPath, entity) {
    await axios
      .post(serverUrl + "/" + subPath + "/", entity, config)
      .then((response) => (responseEntity = response.data))
      .catch(() => (responseEntity = undefined));
    return responseEntity;
  }

  async update(subPath, entity, id) {
      console.log(serverUrl + "/" + subPath + "/" + parseInt(id))
      console.log("entity",entity)
    await axios
      .put(serverUrl + "/" + subPath + "/" + parseInt(id), entity, config)
      .then(() => (responseEntity = this.getOne(subPath, id)))
      .catch(() => (responseEntity = undefined));
    return responseEntity;
  }

  async delete(subPath, id) {
    await axios
      .delete(serverUrl + "/" + subPath + "/" + parseInt(id), config)
      .then((response) => (responseEntity = response.data))
      .catch((error) => console.log(error));
    return responseEntity;
  }

  async deleteRecetas(subPath, id) {
    await axios
      .delete(serverUrl + "/" + subPath + "/" + parseInt(id), config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
    return;
  }
}
