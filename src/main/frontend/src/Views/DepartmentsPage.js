import React from "react";
import Departments from "../Components/Departments";
import { Table } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import AuthService from '../Services/AuthenticationService';

function DepartmentsPage() {
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
                    <h1 className='text-center py-2' style={{ "fontSize": "40px" }}><strong>Departments</strong></h1>
                    <Link to="/newDepartment">
                        <button className="btn btn-primary small mb-3 btn-sm" style={{ float: "right" }}>Add Department </button>
                    </Link>

                    <Table striped bordered hover className="w-75 container my-5">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th style={{textAlign:"center"}}>Employees</th>
                                <th style={{textAlign:"center"}}>Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Departments />
                        </tbody>
                    </Table>
                </div> </>
        )
    }
}
export default DepartmentsPage;