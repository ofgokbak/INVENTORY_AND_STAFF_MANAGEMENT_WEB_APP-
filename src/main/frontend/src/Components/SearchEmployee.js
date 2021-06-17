import React, { useState, useEffect } from 'react';
import EmployeeDataService from "../Services/EmployeeService";
import { Link } from "react-router-dom";


const SearchEmployees = props => {

  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    await EmployeeDataService.search(props.term).then(res => {
      setEmployees(res.data);
      props.emptyEmployeeList(res.data.length === 0)
    });
  }


  useEffect(() => {
    fetchEmployees();
  }, [props.term]);

  return employees
    .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
    .map((employee, index) => {
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
          </tr>
        );
     
    });
}

export default SearchEmployees;