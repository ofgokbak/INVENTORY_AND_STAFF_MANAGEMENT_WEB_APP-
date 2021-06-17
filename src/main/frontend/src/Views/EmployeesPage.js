import React from "react";
import GetEmployees from "../Components/Employees";
import { Table } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import AuthService from '../Services/AuthenticationService';

function EmployeesPage() {
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
                <div className='mt-20 w-50 rounded overflow-hidden shadow-lg container mb-5'>
                    <h1 className='text-center py-2' style={{ "fontSize": "40px" }}><strong>Employee List</strong></h1>
                    <Link to="/newEmployee">
                        <button className="btn btn-primary small mb-3 btn-sm" style={{ float: "right" }}>Add Employee </button>
                    </Link>

                    <Table striped bordered hover className="w-75 container my-5">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <GetEmployees />
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}
export default EmployeesPage;