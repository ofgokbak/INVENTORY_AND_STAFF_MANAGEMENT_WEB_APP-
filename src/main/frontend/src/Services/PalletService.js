import http from "../http-common";
import authHeader from "./AuthenticationHeader";

const getAll = () => {
  return http.get("/pallets", { headers: authHeader() });
};

const get = id => {
  return http.get(`/pallets/${id}`,{ headers: authHeader() });
};

const create = data => {
  return http.post("/pallets", data,{ headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/pallets/${id}`, data, { headers: authHeader() });
};
const updateCollection = (id,collectionID, data) => {
  return http.put(`/pallets/${id}/collection?id=${collectionID}`, data, { headers: authHeader() });
};
const createNewCollection = (id,data) => {
  return http.post(`/pallets/${id}/newCollection`, data,{ headers: authHeader() });
};
const remove = id => {
  return http.delete(`/pallets/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/pallets`, { headers: authHeader() });
};

const findByDepartment = department => {
  return http.get(`/pallets/department?name=${department}`, { headers: authHeader() });
};

export default {
  getAll,
  get,
  create,
  createNewCollection,
  update,
  updateCollection,
  remove,
  removeAll,
  findByDepartment
};