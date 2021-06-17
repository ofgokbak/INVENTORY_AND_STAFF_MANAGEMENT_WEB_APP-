import React, {useState} from "react";
import { Table } from 'react-bootstrap';
import Sidebar from "../Components/Sidebar";
import { Redirect } from 'react-router-dom';
import GetProducts from '../Components/Products'
import AuthService from '../Services/AuthenticationService';

function ProductsPage() {
    const [emptyList,handleEmptyList] =useState(false);
    const[message,setMessage] = useState("");
    
    if (!localStorage.getItem("user")) {

        return <Redirect to="/" />
    }
    else if (localStorage.getItem("role") !== "ROLE_ADMIN") {
        AuthService.logout();
        return <Redirect to="/dashboard" />
    }
    else {
        return (
            <>
                <Sidebar />
                <div className='mt-20 w-50 rounded overflow-hidden shadow-lg container mb-5'>
                    <h1 className='text-center py-2' style={{ "fontSize": "40px" }}><strong>Products</strong></h1>

                    <Table striped bordered hover className="w-75 container mt-5">
                        <thead>
                            <tr>
                                <th>Barcode</th>
                                <th>Title</th>
                                <th>Weight</th>
                                <th>Vendor</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            <GetProducts emptyList = {handleEmptyList}
                            />
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
export default ProductsPage;