import React, { useState, useEffect } from "react";
import EmployeeDataService from "../Services/EmployeeService";
import { useHistory, Redirect } from 'react-router-dom';
import DepartmentDataService from "../Services/DepartmentService";
import Sidebar from "./Sidebar";
import AuthService from '../Services/AuthenticationService';

export default function CreateEmployee() {


  const [departments, setDepartments] = useState([]);
  const fetchDepartments = async () => {
   await DepartmentDataService.getAll().then(res => {
      setDepartments(res.data);
    });
  }
  useEffect(() => {
    fetchDepartments();
  }, []);

  const initialEmployeeState = {
    name: "",
    email: "",
    department: "",
    password: "12345678",
    admin: false
  }

  const [data, setData] = useState(initialEmployeeState)
  const [message, setMessage] = useState("");

  let history = useHistory();



  const submit = async(e) => {
    e.preventDefault();
    if (data.department === "") {
      setMessage("Please select a Department!");
    }
    else {
     await EmployeeDataService.create(data).then(
        res => {
          if (res.data.id === 0) {
            setMessage("Email is already in use!");
          }
          else {
            history.push("/employees");
          }

        }).catch(e => {
          console.log(e);
        })
    }
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    setMessage("");
  }
  function handleDepartment(e) {
    const name = e.target.value;
    setData({ ...data, department: name });
  }
  function handleAdminCheck(e) {

    const isAdmin = !data.admin;

    if (isAdmin) {
      setData({ ...data, admin: isAdmin, department: "Administration" })

    }
    else {
      setData({ ...data, admin: isAdmin, department: "" })

    }
  }
  if (!localStorage.getItem("user")) {

    return <Redirect to="/" />
  }
  else if (localStorage.getItem("role") !== "ROLE_ADMIN") {
    AuthService.logout();
    return <Redirect to="/" />
  }
  else {
    return (
      <>
        <Sidebar />
        <div className="py-3 px-3 max-w-sm rounded overflow-hidden shadow-lg container " style={{ marginTop: "100px" }} >
          <form onSubmit={(e) => submit(e)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => handle(e)}
                value={data.name}
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                required
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => handle(e)}
                type="text"
                className="form-control"
                id="email"
                placeholder="Email"
                required
                value={data.email}
                name="email"
              />
            </div>

            <div className="form-group w-50">
              <label htmlFor="admin">Admin</label>
              <input
                className="ml-2 fixed-center"
                type="checkbox"
                defaultChecked={data.admin === true}
                value={data.admin}
                onChange={(e) => handleAdminCheck(e)} />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>

              <select
                className="browser-default custom-select"
                id="department"
                name="department"
                placeholder="Select"
                onChange={(e) => handleDepartment(e)}>
                {!data.admin ?
                  <option value="">Select a department...</option>
                  : null}
                {!data.admin ?
                  departments.map((department, index) => {
                    if (department.name !== "Administration") {
                      return (
                        <option key={index} value={department.name}>{department.name}</option>
                      );
                    }
                    else
                      return null;
                  }
                  ) :
                  <option key={1} value="Administration">Administration</option>
                }
              </select>
            </div>
            <button className="btn btn-primary">
              Add Employee
            </button>
            <p className="text-danger font-weight-bold">{message}</p>
          </form>
        </div>
      </>
    )
  }
}
