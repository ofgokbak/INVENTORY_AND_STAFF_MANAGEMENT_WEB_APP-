import React, { useState, useEffect } from "react";
import EmployeeDataService from "../Services/EmployeeService";
import Sidebar from "../Components/Sidebar";
import { useHistory } from 'react-router-dom';
import AuthService from '../Services/AuthenticationService';

function GetSettings() {
    const initialEmployeeState = {
        id: null,
        name: "",
        email: "",
        department: "",
        isAdmin: null
    };
    const initialPasswordState = {
        currentOne: "",
        newOne: ""
    }
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
    const [newPassword, setNewPassword] = useState(initialPasswordState);
    const [message, setMessage] = useState("");
    const [message2, setMessage2] = useState("");

    const getEmployee = async (id) => {
        await EmployeeDataService.get(id)
            .then(response => {
                setCurrentEmployee(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    let employeeId = AuthService.getCurrentUser().id;

    useEffect(() => {
        getEmployee(employeeId);
    }, [employeeId]);

    const [handlee, setHandle] = useState(false)
    const [emailChanged, setHandleEmail] = useState(false)
    const [handlePassword, setHandlePassword] = useState(false)
    const [editable, setEditable] = useState(false);

    const showPasswordForm = () => {
        const state = handlePassword;
        setHandlePassword(!state);
    }
    let history = useHistory();

    const updateEmployee = async () => {

        await EmployeeDataService.update(employeeId, currentEmployee).then(res => {
            if (emailChanged) {
                alert("Email is updated. Please sign in with your new email");
                AuthService.logout();
                history.push("/");
            }
            setMessage("Updated successfuly")
            setHandle(false);
        })

            .catch(e => {
                console.log(e);

            });
    };
    const updatePassword = async () => {
        if (confirmPassword !== newPassword.newOne) {
            setMessage2("Confirmation failed!");
            setConfirmPassword("");
        }
        else {
            await EmployeeDataService.updatePassword(employeeId, newPassword).then(res => {
                setMessage2(res.data);
                setNewPassword(initialPasswordState);
                setConfirmPassword("");
                if (res.data === "Password is updated.") {
                    setHandle(false);
                    setHandleEmail(false);
                }
            })
                .catch(e => {
                    console.log(e);

                });
        }
    };

    const edit = () => {
        setEditable(!editable);
    }

    function handlePwd(e) {
        const newData = { ...newPassword };
        newData[e.target.id] = e.target.value;
        setNewPassword(newData);
        setMessage2("");
    }


    function handle(e) {
        const newData = { ...currentEmployee };
        newData[e.target.id] = e.target.value;
        setCurrentEmployee(newData);
        setMessage("");
        setHandle(true);
    }
    function handleEmail(e) {
        setCurrentEmployee({ ...currentEmployee, email: e.target.value });
        setMessage("");
        setHandle(true);
        setHandleEmail(true);
    }

    function handleConfirmPassword(e) {
        const newData = e.target.value;
        setConfirmPassword(newData);
    }


    return (
        <>
            <Sidebar />
            <div className="py-3 px-3 mt-20 max-w-sm rounded overflow-hidden shadow-lg container">
                {!handlePassword ? (
                    <div className="edit-form pb-1">
                        <form className=''>
                            <div className="form-group">
                                <label htmlFor="name"><strong>Name:</strong></label>
                                <input
                                    onChange={(e) => handle(e)}
                                    readOnly={editable ? false : true}
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
                                    onChange={(e) => handleEmail(e)}
                                    readOnly={editable ? false : true}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={currentEmployee.email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department: </label>
                                <input
                                    readOnly={true}
                                    type="text"
                                    className="form-control"
                                    id="department"
                                    name="department"
                                    value={currentEmployee.department}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentEmployee.isAdmin ? " Admin" : " Employee"}
                            </div>
                        </form>

                        {!editable ?
                            <button type="submit" className="badge badge-warning  " onClick={edit}>
                                Edit
                            </button>
                            : <>
                                {handlee ? (
                                    <button
                                        type="submit"
                                        className="badge badge-success"
                                        onClick={updateEmployee}
                                    >
                                        Update
                                    </button>
                                ) : (
                                        <>
                                            <p className="text-success font-weight-bold">{message}</p>

                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <button
                                                    type="submit"
                                                    className="badge badge-primary"
                                                    onClick={showPasswordForm}
                                                >
                                                    Edit Password{" >>"}
                                                </button>
                                            </div>
                                        </>
                                    )}
                            </>
                        }
                    </div>

                ) : (
                        <>
                            <div className="form-group">
                                <label htmlFor="name"><strong>Current Password:</strong></label>
                                <input
                                    onChange={(e) => handlePwd(e)}
                                    type="password"
                                    className="form-control"
                                    id="currentOne"
                                    name="currentOne"
                                    value={newPassword.currentOne}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    <strong>New Password:</strong>
                                </label>
                                <input
                                    onChange={(e) => handlePwd(e)}
                                    type="password"
                                    className="form-control"
                                    id="newOne"
                                    name="newOne"
                                    value={newPassword.newOne}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    <strong> Confirm New Password:</strong>
                                </label>
                                <input
                                    onChange={(e) => handleConfirmPassword(e)}
                                    type="password"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={confirmPassword}
                                />
                                {message2 !== "Password is updated." ?
                                    <p className="text-danger font-weight-bold">{message2}</p>
                                    : <p className="text-success font-weight-bold">{message2}</p>}


                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button
                                    type="submit"
                                    className="badge badge-primary"
                                    onClick={updatePassword}
                                >
                                    Update
                    </button>

                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <button
                                    type="submit"
                                    className="badge badge-success"
                                    onClick={showPasswordForm}
                                >
                                    {"<< "}Back
                    </button>

                            </div>

                        </>)}
            </div>
        </>
    );
}
export default GetSettings;