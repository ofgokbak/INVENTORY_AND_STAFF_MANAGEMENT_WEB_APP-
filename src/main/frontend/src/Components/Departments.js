import React, { useState, useEffect } from 'react';
import DepartmentDataService from "../Services/DepartmentService";
import { Link, Redirect } from "react-router-dom";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const fetchDepartments = async() => {
    await DepartmentDataService.getAll().then(res => {
      setDepartments(res.data);
    });
  }
  const removeChosenOne = async(id) =>{
    await DepartmentDataService.remove(id);
    fetchDepartments();
  }
  useEffect(() => {
    fetchDepartments();
  }, []);
  if (!localStorage.getItem("user")||localStorage.getItem("role")!=="ROLE_ADMIN") {
    return <Redirect to="/" />
  }

  return departments
    .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
    .map((department, index) => {

      return (
        <tr key={index}>
          <td>
            {department.id}
          </td>
          <td>
            {/* <Link to={`/employees/${employee.id}`} key={index}> */}
            {department.name}
            {/* </Link> */}
          </td>
          <td style={{textAlign:"center" }}>
            <Link to={`/departments/${department.name}/employees`} key={index}>
              {department.employees}
            </Link>
          </td>
          <td style={{textAlign:"center"}}>
          <Link to={`/departments/${department.name}/products`} key={index}>
              {department.products}
            </Link>
          </td>
          <td style={{textAlign:"center"}}>
          <button className="badge badge-danger mr-2" onClick={() => removeChosenOne(department.id)}>
            X
        </button>
          </td>
        </tr>
      );
    });
}
export default Departments;