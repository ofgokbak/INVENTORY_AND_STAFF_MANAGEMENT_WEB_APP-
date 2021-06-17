import React from 'react';
import Employee from '../Components/Employee';
import Sidebar from '../Components/Sidebar';
import { Redirect } from 'react-router-dom';
import AuthService from '../Services/AuthenticationService';

function EmployeePage() {
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
                <div>
                    <Employee />
                </div>
            </>
        )
    }
}

export default EmployeePage
