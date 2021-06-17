import React, { useState } from "react";
import ProductDataService from "../Services/ProductService";
import { useHistory, Redirect } from 'react-router-dom';
import Sidebar from "./Sidebar";
import AuthService from '../Services/AuthenticationService';

export default function CreateProduct() {
    const initialProductState = {
        barcode: "",
        title: "",
        description: "",
        department: localStorage.getItem("department"),
        weight: 0,
        vendor: "",
    }

    const [data, setData] = useState(initialProductState)
    const [message, setMessage] = useState("");

    let history = useHistory();



    const submit = async(e) => {
        e.preventDefault()
        await ProductDataService.create(data).then(
            res => {
                console.log(res.data);
                if (res.data === "inUse") {
                    setMessage("Barcode already exists in the system!");
                    setData({...data, barcode: ""})
                }
                else {
                    history.push(`/departments/${localStorage.getItem("department")}/products`);
                }

            }).catch(e => {
                console.log(e);
            })
    }

    function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    if (!localStorage.getItem("user")) {

        return <Redirect to="/" />
    }
    else if (localStorage.getItem("role") !== "ROLE_EMPLOYEE") {
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
                            <label htmlFor="barcode">Barcode</label>
                            <input
                                onChange={(e) => handle(e)}
                                value={data.barcode}
                                type="text"
                                className="form-control"
                                id="barcode"
                                placeholder="Barcode"
                                required
                                name="barcode"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                onChange={(e) => handle(e)}
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Title"
                                required
                                value={data.title}
                                name="title"
                            />
                        </div>

                        <div className="form-group w-50">
                            <label htmlFor="description">Description</label>
                            <input
                                onChange={(e) => handle(e)}
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="Description"
                                required
                                value={data.description}
                                name="description"
                            />
                        </div>

                        <div className="form-group w-50">
                            <label htmlFor="weight">Weight</label>
                            <input
                                onChange={(e) => handle(e)}
                                type="text"
                                className="form-control"
                                id="weight"
                                placeholder="Weight"
                                required
                                value={data.weight}
                                name="weight"
                            />
                        </div>
                        <div className="form-group w-50">
                            <label htmlFor="vendor">Vendor</label>
                            <input
                                onChange={(e) => handle(e)}
                                type="text"
                                className="form-control"
                                id="vendor"
                                placeholder="Vendor"
                                required
                                value={data.vendor}
                                name="vendor"
                            />
                        </div>

                        <button className="btn btn-primary">
                            Create Product
            </button>
                        <p className="text-danger font-weight-bold">{message}</p>
                    </form>
                </div>
            </>
        )
    }
}
