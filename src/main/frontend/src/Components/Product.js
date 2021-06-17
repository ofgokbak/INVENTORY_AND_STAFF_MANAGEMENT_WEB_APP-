import React, { useState, useEffect } from "react";
import ProductDataService from "../Services/ProductService";
import { useHistory, Redirect, useParams, Link } from 'react-router-dom';
import AuthService from "../Services/AuthenticationService";

export default function GetProduct() {
    const initialProductState = {
        barcode: "",
        title: "",
        description: "",
        department: "",
        weight: 0,
        vendor: ""
    }

    let params = useParams();
    const departmentUser = localStorage.getItem("department");
    let productBarcode = params.barcode;
    const [data, setData] = useState(initialProductState)
    const [message, setMessage] = useState("");
    const [editable, setEditableState] = useState(false);
    const getProduct = async (barcode) => {
        await ProductDataService.get(barcode)
            .then(response => {
                if (localStorage.getItem("role") === "ROLE_EMPLOYEE" && departmentUser !== response.data.department) {
                    history.push("/dashboard");
                }
                setData(response.data);

            })
            .catch(e => {
                console.log(e);
            });

    };

    useEffect(() => {
        getProduct(productBarcode);
    }, [productBarcode]);

    let history = useHistory();

   

    const update = async (e) => {
        e.preventDefault()
        await ProductDataService.update(data.barcode, data).then(
            res => {
                if (res.data.barcode === "inUse") {
                    setMessage("Barcode already exists in the system!");
                }
                else {
                    if (AuthService.getCurrentUser().roles[0] !== "ROLE_ADMIN") {
                        history.push(`/departments/${localStorage.getItem("department")}/products`);
                    }
                    else {
                        handleEditablestate();
                    }
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

    const handleEditablestate = () => {
        setEditableState(!editable);
    }



    return (
        <>
            <div className="py-3 px-3 max-w-sm rounded overflow-hidden shadow-lg container " style={{ marginTop: "100px" }} >
                <form >
                    <div className="form-group">
                        <label htmlFor="barcode">Barcode</label>
                        <input
                            readOnly={true}
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
                            readOnly={editable ? false : true}
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
                            readOnly={editable ? false : true}
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
                            readOnly={editable ? false : true}
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
                            readOnly={editable ? false : true}
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
                    {editable ?
                        <button className="btn btn-primary" type="submit" onClick={(e) => update(e)}>
                            Update Product
                        </button>
                        : <div>
                            <Link to={`/products/${data.barcode}/logs`}>
                                <button type="submit" className="badge badge-info mr-3 text-l" onClick={null}>
                                    Product Logs
                        </button>
                            </Link>
                            {/* <div style={{ display: "flex", justifyContent: "flex-end" }}> */}
                            <button type="submit" className="badge badge-warning " onClick={handleEditablestate}>
                                Edit
                        </button>
                        </div>
                    }
                    <p className="text-danger font-weight-bold">{message}</p>
                </form>


            </div>
        </>
    )
}
