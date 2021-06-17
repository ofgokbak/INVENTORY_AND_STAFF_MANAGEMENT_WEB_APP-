import http from "../http-common";
import authHeader from "./AuthenticationHeader";

const getAll = () => {
  return http.get("/products", { headers: authHeader() });
};

const get = id => {
  return http.get(`/products/${id}`,{ headers: authHeader() });
};

const search = (term,department) => {
  return http.get(`/products/${department}/search/${term}`,{ headers: authHeader() });
};

const getLogs = id => {
  return http.get(`/products/${id}/logs`,{ headers: authHeader() });
};

const create = data => {
  return http.post("/products", data,{ headers: authHeader() });
};

const update = (barcode, data) => {
  return http.put(`/products/${barcode}`, data, { headers: authHeader() });
};

const remove = id => {
  return http.delete(`/products/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/products`, { headers: authHeader() });
};

const findByDepartment = department => {
  return http.get(`/products/department/${department}`, { headers: authHeader() });
};

export default {
  getAll,
  get,
  search,
  getLogs,
  create,
  update,
  remove,
  removeAll,
  findByDepartment
};