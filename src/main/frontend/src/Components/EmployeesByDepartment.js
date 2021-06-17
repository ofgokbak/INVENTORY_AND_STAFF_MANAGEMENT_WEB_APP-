import React, { useState, useEffect } from 'react';
import EmployeeDataService from "../Services/EmployeeService";
import { Link, useParams } from "react-router-dom";
import AuthService from "../Services/AuthenticationService";


const GetEmployeesByDepartment = () => {

  const [employees, setEmployees] = useState([]);

  let params = useParams()

  const fetchEmployees = async () => {
    await EmployeeDataService.findByDepartment(params.name).then(res => {
      setEmployees(res.data);
      console.log(AuthService.getCurrentUser.department);
    });
  }
  useEffect(() => {
    fetchEmployees();
  }, []);

  const removeChosenOne = async (id) => {
    await EmployeeDataService.remove(id);
    fetchEmployees();
  }

  return employees
    .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
    .map((employee, index) => {
      if (AuthService.getCurrentUser().email !== employee.email) {
        return (
          <tr key={index}>
            <td>
              <Link to={`/employees/${employee.id}`} key={index}>
                {employee.id}
              </Link>
            </td>
            <td>
              <Link to={`/employees/${employee.id}`} key={index}>
                {employee.name}
              </Link>
            </td>
            <td>{employee.email}</td>
            <td>
                {employee.department}
            </td>
            <td>{employee.admin === true ? "Admin" : "Employee"}</td>
            <td style={{ textAlign: "center" }}>
              <button className="badge badge-danger mr-2" onClick={() => removeChosenOne(employee.id)}>
                X
        </button>
            </td>
          </tr>
        );
      }

      else {
        return (
          <tr key={index}>
            <td>
                {employee.id}
            </td>
            <td>
                {employee.name}
            </td>
            <td>{employee.email}</td>
            <td>
                {employee.department}
            </td>
            <td>{employee.admin === true ? "Admin" : "Employee"}</td>
            <td></td>
          </tr>
        );

      }

    });
}

export default GetEmployeesByDepartment;