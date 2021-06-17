import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import GetProductCollections from "../Components/ProductCollections";
import GetPallet from "../Components/Pallet";
import NewCollection from "../Components/CreateProductCollection";
import { useParams } from "react-router-dom";
import PalletDataService from "../Services/PalletService";

function PalletPage() {
    const params = useParams();
    const palletId = params.id;
    const [pallet,setPallet] = useState([]);
    const [message, setMessage] = useState("");
    const [collections, setCollections] = useState([]);
    const [viewCollection, setViewCollection] = useState(true);
    function handleChange(newValue) {
        setMessage(newValue);
    }

    const fetchCollections = async () => {
        await PalletDataService.get(palletId).then(res => {
            setPallet(res.data);
            setCollections(res.data.collections);
        });
    }
    useEffect(() => {
        fetchCollections();
    }, []);

    if (!localStorage.getItem("user")) {
        return <Redirect to="/" />
    }
    return (
        <>
            <Sidebar />
            <div className='mt-20 w-50 rounded overflow-hidden shadow-lg container mb-5'>
                <GetPallet viewCollections={viewCollection} onChangeView={setViewCollection} pallet ={pallet}
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
                                <GetProductCollections collections={collections} onChange={handleChange} onChangeCollection={fetchCollections} id={palletId}
                                />
                                <NewCollection collections={collections} onChange={handleChange} onChangeCollection={fetchCollections} id={palletId}
                                />
                            </tbody>

                        </Table>
                        <p className="text-danger font-weight-bold my-2 text-xl">{message}</p> </> : null}
            </div>
        </>
    )

}
export default PalletPage;