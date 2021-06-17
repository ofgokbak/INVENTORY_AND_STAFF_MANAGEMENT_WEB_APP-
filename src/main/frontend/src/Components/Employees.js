import React, { useState, useEffect } from 'react';
import EmployeeDataService from "../Services/EmployeeService";
import { Link } from "react-router-dom";
import AuthService from '../Services/AuthenticationService';


function GetEmployees() {

  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    await EmployeeDataService.getAll().then(res => {
      setEmployees(res.data);
    });
  }

  const removeChosenOne = async (id) => {
    await EmployeeDataService.remove(id);
    fetchEmployees();
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

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
              <Link to={`/departments/${employee.department}/employees`} key={index}>
                {employee.department}
              </Link>
            </td>
            <td>{employee.isAdmin === true ? "Admin" : "Employee"}</td>
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
          <>
          </>
        );
      }
    });
}

export default GetEmployees;