import http from "../http-common";
import authHeader from "./AuthenticationHeader";

const getAll = () => {
  return http.get("/departments", { headers: authHeader() });
};

const getDashboard = departmentName => {
  return http.get(`/dashboard/${departmentName}`, { headers: authHeader() });
};

const get = id => {
  return http.get(`/departments/${id}`, { headers: authHeader() });
};

const create = data => {
  return http.post("/departments", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/departments/${id}`, data, { headers: authHeader() });
};

const remove = id => {
  return http.delete(`/departments/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/departments`, { headers: authHeader() });
};

const getEmployeesByDepartment = name => {
  return http.get(`/departments/employees?department=${name}`, { headers: authHeader() });
};

const getProductsByDepartment = name => {
  return http.get(`/departments/products?department=${name}`, { headers: authHeader() });
};

const findByName = name => {
  return http.get(`/departments/department?name=${name}`, { headers: authHeader() });
};


export default {
  getAll,
  getDashboard,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  getEmployeesByDepartment,
  getProductsByDepartment
};