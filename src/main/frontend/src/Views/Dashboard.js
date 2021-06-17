import React, { useState, useEffect } from "react";
import DepartmentDataService from "../Services/DepartmentService";
import '@fortawesome/react-fontawesome';
import Sidebar from "../Components/Sidebar";
import { Redirect, useHistory } from 'react-router-dom';

function Dashboard() {

    const [dashboard, setDashboard] = useState([]);
    const department = localStorage.getItem("department");
    const fetchDashboard = () => {
        checkAdmin();
        DepartmentDataService.getDashboard(department).then(res => {
            setDashboard(res.data);
        });
    }
    const [admin, setAdmin] = useState(false);
    function checkAdmin() {
        if (localStorage.getItem("role") === "ROLE_ADMIN") {
            setAdmin(true);
        }
    }
    let history = useHistory();
    const goToPage = location => {
        if (localStorage.getItem("role") === "ROLE_EMPLOYEE")
        {
            if(location === "products")
            {
                return(history.push(`/departments/${department}/products`));
            }
            return(history.push(`/departments/${department}/pallets`));

        }
        history.push(`${location}`);
    }

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (!localStorage.getItem("user")) {
        return <Redirect to="/" />
    }


    return (
        <>
            <Sidebar />
            <div>
                <div className="container w-50 mt-20" >
                    <h1 className="py-3 text-center font-bold text-3xl" style={{ "fontSize": "40px" }} >Dashboard</h1>
                </div>

                <div style={{ marginx: "auto", marginTop: "100px" }}>
                    {admin ?
                        <div className="d-flex row mb-6 justify-content-center align-items-center ">
                            <div className="col-xl-3 col-sm-6 py-2 mr-3 " onClick = {(e)=> goToPage("departments")}>
                                    <div className="card bg-success text-white h-100" >
                                        <div className="card-body bg-success text-center ">
                                            <div className="rotate">
                                                <i className="fa fa-user fa-4x"></i>
                                            </div>
                                            <h6 className="text-uppercase">Departments</h6>
                                            <h1 className="display-4">{dashboard.departments}</h1>
                                        </div>
                                    </div>
                            </div>

                            <div className="col-xl-3 col-sm-6 py-2 ml-3" onClick = {(e)=> goToPage("employees")}>
                                    <div className="card text-white bg-danger h-100">
                                        <div className="card-body bg-danger text-center">
                                            <div className="rotate">
                                                <i className="fa fa-user fa-4x"></i>
                                            </div>
                                            <h6 className="text-uppercase">Employees</h6>
                                            <h1 className="display-4">{dashboard.employees}</h1>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        : null}
                    <div className=" d-flex row mb-6 justify-content-center align-items-center">
                        <div className="col-xl-3 col-sm-6 py-2 mr-3" onClick = {(e)=> goToPage("products")}>
                                <div className="card text-white bg-info h-100">
                                    <div className="card-body bg-info text-center">
                                        <div className="rotate">
                                            <i className="fa fa-twitter fa-4x"></i>
                                        </div>
                                        <h6 className="text-uppercase">Products</h6>
                                        <h1 className="display-4">{dashboard.products}</h1>
                                    </div>
                                </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 py-2 ml-3">
                                <div className="card text-white bg-warning h-100" onClick = {(e)=> goToPage("pallets")}>
                                    <div className="card-body text-center">
                                        <div className="rotate">
                                            <i className="fa fa-share fa-4x"></i>
                                        </div>
                                        <h6 className="text-uppercase">Pallets</h6>
                                        <h1 className="display-4">{dashboard.pallets}</h1>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;

