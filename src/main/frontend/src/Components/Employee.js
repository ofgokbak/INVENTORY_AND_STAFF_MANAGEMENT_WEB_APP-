import React, { useState, useEffect } from "react";
import EmployeeDataService from "../Services/EmployeeService";
import DepartmentDataService from "../Services/DepartmentService";
import {
  Redirect,
  useHistory,
  useParams
} from "react-router-dom";

const Employee = props => {

  const [departments, setDepartments] = useState([]);
  const fetchDepartments = async() => {
   await DepartmentDataService.getAll().then(res => {
      setDepartments(res.data);
    });
  }
  useEffect(() => {
    fetchDepartments();
  }, []);


  const initialEmployeeState = {
    id: null,
    name: "",
    email: "",
    department: "",
    isAdmin: null,
  };
  const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);

  const getEmployee = async (id) => {
    await EmployeeDataService.get(id)
      .then(response => {
        setCurrentEmployee(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  };


  let params = useParams();
  let employeeId = params.id;

  useEffect( () => {
   getEmployee(employeeId);
  }, [employeeId]);

  const [handle, setHandle] = useState(false)


  function handleDepartment(e) {
    const name = e.target.value
    if(name!=="Administration"){
      setCurrentEmployee({ ...currentEmployee, isAdmin:false, department:name});
    }else{
      setCurrentEmployee({ ...currentEmployee, isAdmin:true, department:name});
    }
    setHandle(true);
    
  }

  let history = useHistory();
  const updateEmployee = async() => {

    await EmployeeDataService.update(currentEmployee.id, currentEmployee).then(res => {
      console.log(res.data);
      history.push("/employees");
    })

      .catch(e => {
        console.log(e);

      });
  };





  return (
    <div className="py-3 px-3 mt-20 max-w-sm rounded overflow-hidden shadow-lg container">
      {currentEmployee ? (
        <div className="edit-form pb-1">
          <form className=''>
            <div className=" ">
              <label htmlFor="name"><strong>Name:</strong></label>
              <input
                readOnly={true}
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentEmployee.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <strong>E-mail:</strong>
              </label>
              <input
                readOnly={true}
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentEmployee.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                className="browser-default custom-select"
                id="department"
                name="department"
                onChange={(e) => handleDepartment(e)}>
                <option defaultValue={currentEmployee.department} >{currentEmployee.department}</option>
                {departments.map((department, index) => {
                  if (department.name !== currentEmployee.department) {
                    return (
                      <option key={index} value={department.name}>{department.name}</option>
                    );
                  }
                  return null;
                }
                )}
              </select>
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentEmployee.isAdmin ? "Admin" : "Employee"}
            </div>
          </form>


          {handle ? (
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateEmployee}
            >
              Update
            </button>) : null}
          {/* <p>{message}</p> */}
        </div>
      ) : (
          <Redirect to="/employees" />
        )}
    </div>
  );
};

export default Employee;