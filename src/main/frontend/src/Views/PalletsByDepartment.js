import React, { useState } from "react";
import GetPalletsByDepartment from "../Components/PalletsByDepartment";
import { Table } from 'react-bootstrap';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import AuthService from '../Services/AuthenticationService';

function PalletsByDepartmentPage() {
    let params = useParams();
    let history= useHistory();
    const[message,setMessage] = useState("");
    const [emptyList,handleEmptyList] =useState(false);
    
    const GoToCreatePalletPage = () =>{
        if(emptyList)
        {
            setMessage("No product exists in the department.Add a product before create a pallet!")
        }else
        {
            history.push("/newPallet");
        }
        
    }
    if (!localStorage.getItem("user")) {

        return <Redirect to="/" />
    }
    else if (localStorage.getItem("role") === "ROLE_EMPLOYEE" && localStorage.getItem("department") !== params.name) {
        return <Redirect to="/dashboard" />;

    }
    else {
        return (
            <>
                <Sidebar />
                <div className='mt-20 w-50 rounded overflow-hidden shadow-lg container mb-5'>
                    <h1 className='text-center py-2' style={{ "fontSize": "40px" }}><strong>{params.name}'s Pallets</strong></h1>
                    {localStorage.getItem("role") === "ROLE_EMPLOYEE" ?
                            <button className="btn btn-primary small mb-3 btn-sm" style={{ float: "right" }} onClick = {()=> GoToCreatePalletPage()}>Create Pallet </button>
                        : null
                    }
                    <Table striped bordered hover className="w-75 container mt-5">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Collections</th>
                                <th>Department</th>
                                <th>Location</th>
                                {localStorage.getItem("role") === "ROLE_EMPLOYEE" ?
                                    <th></th>
                                : null}
                            </tr>

                        </thead>
                        <tbody>
                            <GetPalletsByDepartment  name = {params.name} emptyList = {handleEmptyList}/>
                        </tbody>
                        
                    </Table>
                    {emptyList? 
                        <div>
                        <p style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: 'bold'}} className ="text-xl pb-5">
                           - Empty -
                            </p>
                        </div>
                        :null}
                    <p className="text-danger font-weight-bold my-2 ">{message}</p>
                </div>
            </>
        )
    }
}
export default PalletsByDepartmentPage;