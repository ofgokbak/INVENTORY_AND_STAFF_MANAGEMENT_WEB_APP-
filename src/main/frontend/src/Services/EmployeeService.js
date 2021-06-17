import http from "../http-common";
import authHeader from "./AuthenticationHeader";

const getAll = () => {
  return http.get("/employees", { headers: authHeader() });
};

const get = id => {
  return http.get(`/employees/${id}`,{ headers: authHeader() });
};

const search = (term) => {
  return http.get(`/employees/search/${term}`,{ headers: authHeader() });
};

const create = data => {
  return http.post("/employees", data,{ headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/employees/${id}`, data, { headers: authHeader() });
};
const updatePassword = (id, data) => {
  return http.put(`/employees/${id}/newPassword`, data, { headers: authHeader() });
};
const remove = id => {
  return http.delete(`/employees/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/employees`, { headers: authHeader() });
};

const findByDepartment = department => {
  return http.get(`/employees/department/${department}`, { headers: authHeader() });
};

export default {
  getAll,
  get,
  search,
  create,
  update,
  updatePassword,
  remove,
  removeAll,
  findByDepartment
};