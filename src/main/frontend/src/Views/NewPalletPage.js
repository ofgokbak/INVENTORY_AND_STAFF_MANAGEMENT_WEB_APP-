import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import GetProductCollections from "../Components/ProductCollections";
import NewPallet from "../Components/NewPallet";
import NewCollection from "../Components/CreateProductCollection";
import { useParams } from "react-router-dom";
import PalletDataService from "../Services/PalletService";
import AuthService from "../Services/AuthenticationService";

export default function NewPalletPage() {
    const [message, setMessage] = useState("");
    const [viewCollection, setViewCollection] = useState(false);

    const initialPalletState ={
        id: null,
        description: "",
        location: "",
        department: localStorage.getItem("department"),
        collections:[],
        logs:[]
    }
    const [pallet, setPallet] = useState(initialPalletState);

    function handleChange(newValue) {
        setMessage(newValue);
    }
    const fetchPallet = async() =>{
        if(pallet.id !==null)
        {
            await PalletDataService.get(pallet.id).then(res=> {
                setPallet(res.data);
            })
        }
         else{
             console.log("null id");
         }
        
    }

    useEffect(() => {
        fetchPallet();
    }, pallet.collections);

    if (!localStorage.getItem("user")) {
        return <Redirect to="/" />
    }
    else if (localStorage.getItem("role") !== "ROLE_EMPLOYEE") {
        return <Redirect to="/dashboard" />
    }
    return (
        <>
            <Sidebar />
            <div className='mt-20 w-50 rounded overflow-hidden shadow-lg container mb-5'>
                <NewPallet pallet={pallet} onChangeView={setViewCollection }  onChangePallet = {setPallet}
                />
                {viewCollection ?
                    <>
                        <h1 className='text-center  pb-2' style={{ "fontSize": "40px" }}><strong>Collections</strong></h1>

                        <Table striped bordered hover className="w-80 container ">
                            <thead >
                                <tr>
                                    <th style={{ textAlign: "center" }}>Id</th>
                                    <th style={{ textAlign: "center" }}>Product</th>
                                    <th style={{ textAlign: "center" }}>Quantity</th>
                                    <th style={{ textAlign: "center" }}>Max Capacity</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <GetProductCollections collections={pallet.collections} onChange={handleChange} onChangeCollection={fetchPallet} id={pallet.id}
                                />
                                <NewCollection collections={pallet.collections} onChange={handleChange} onChangeCollection={fetchPallet} id={pallet.id}
                                />
                            </tbody>

                        </Table>
                        <p className="text-danger font-weight-bold my-2 text-xl">{message}</p> </> : null}
            </div>
        </>
    )

}