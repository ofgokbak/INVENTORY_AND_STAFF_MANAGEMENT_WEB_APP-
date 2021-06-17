import React, { useState, } from "react";
import { useHistory, Redirect } from 'react-router-dom';
import DepartmentDataService from "../Services/DepartmentService";
import Sidebar from "./Sidebar";
import AuthService from '../Services/AuthenticationService';

export default function CreateDepartment() {
    const initialDepartmentState = {
        id: null,
        name: ""
    }

    const [department, setName] = useState(initialDepartmentState);
    const [message, setMessage] = useState("");
    let history = useHistory();

    function handle(e) {
        const input = e.target.value;
        setMessage("");
        setName({ ...department, name: input });
    }
    const submit = async (e)=> {
        e.preventDefault()
        await DepartmentDataService.create(department).then(
            res => {
                if (res.data.id === -1) {
                    setMessage("Department already exists!");
                }
                else {
                    history.push("/departments");
                }
            }).catch(e => {
                console.log(e);
            })
    }

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
                <div className="py-3 px-3 max-w-sm rounded overflow-hidden shadow-lg container " style={{ marginTop: "100px" }} >
                    <form onSubmit={(e) => submit(e)}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={(e) => handle(e)}
                                value={department.name}
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Name"
                                required
                                name="name"
                            />
                        </div>
                        <button className="btn btn-primary">
                            Add Department
            </button>
                        <p className="text-danger font-weight-bold">{message}</p>
                    </form>
                </div>
            </>);
    }
}