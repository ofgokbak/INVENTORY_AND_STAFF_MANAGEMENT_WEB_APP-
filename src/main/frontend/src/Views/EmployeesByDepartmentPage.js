import React from "react";
import { Table } from 'react-bootstrap';
import { useParams, Redirect } from 'react-router-dom';
import GetEmployeesByDepartment from "../Components/EmployeesByDepartment";
import Sidebar from "../Components/Sidebar";
import AuthService from '../Services/AuthenticationService';

function EmployeesByDepartmentPage() {

    let params = useParams()

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
                    <h1 className='text-center py-2' style={{ "fontSize": "40px" }}><strong>{params.name}'s Employees</strong></h1>
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
                            <GetEmployeesByDepartment
                            />
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}
export default EmployeesByDepartmentPage;