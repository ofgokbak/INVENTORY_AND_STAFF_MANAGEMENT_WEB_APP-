import React,{useState} from "react";
import { Table } from 'react-bootstrap';
import Sidebar from "../Components/Sidebar";
import { Redirect, useParams, Link } from 'react-router-dom';
import GetProductsByDepartment from '../Components/ProductsByDepartment'

function ProductsByDepartment() {
    let params = useParams();
    const [emptyList,handleEmptyList] =useState(false);
    const[message,setMessage] = useState("");
    if (!localStorage.getItem("user")) {

        return <Redirect to="/" />;
    }
    else {
        if (localStorage.getItem("role") === "ROLE_EMPLOYEE" && localStorage.getItem("department") !== params.name) {
            return <Redirect to="/dashboard" />;
        }
    }

    return (
        <>
            <Sidebar />
            <div className='mt-20 w-50 rounded overflow-hidden shadow-lg container mb-5'>
                <h1 className='text-center py-2' style={{ "fontSize": "40px" }}><strong>{params.name}'s Products</strong></h1>
                {localStorage.getItem("role") === "ROLE_EMPLOYEE" ?
                    <Link to="/newProduct">
                        <button className="btn btn-primary small mb-3 btn-sm" style={{ float: "right" }}>Add Product </button>
                    </Link>
                    : null
                }
                <Table striped bordered hover className="w-75 container mt-5">
                    <thead>
                        <tr>
                            <th>Barcode</th>
                            <th>Title</th>
                            <th>Weight</th>
                            <th>Vendor</th>
                            {localStorage.getItem("role") === "ROLE_EMPLOYEE" ?
                            <th></th> : null
                        }
                        </tr>
                    </thead>
                    <tbody>
                        <GetProductsByDepartment emptyList = {handleEmptyList}
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
    );
}
export default ProductsByDepartment;