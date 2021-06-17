import React from "react";
import GetPallets from "../Components/Pallets";
import { Table } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import AuthService from '../Services/AuthenticationService';

function PalletsPage() {
    if (!localStorage.getItem("user")) {

        return <Redirect to="/" />
    }
    else if (localStorage.getItem("role") !== "ROLE_ADMIN") {
        return <Redirect to="/dashboard" />
    }
    else {
        return (
            <>
                <Sidebar />
                <div className='mt-20 w-50 rounded overflow-hidden shadow-lg container mb-5'>
                    <h1 className='text-center py-2' style={{ "fontSize": "40px" }}><strong>Pallets</strong></h1>
                    {/* <Link to="/newPallet">
                        <button className="btn btn-primary small mb-3 btn-sm" style={{ float: "right" }}>Create Pallet </button>
                    </Link> */}

                    <Table striped bordered hover className="w-75 container my-5">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Collections</th>
                                <th>Department</th>
                                <th>Location</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <GetPallets />
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}
export default PalletsPage;