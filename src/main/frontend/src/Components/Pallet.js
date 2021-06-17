import React, { useState, useEffect } from 'react';
import PalletDataService from "../Services/PalletService";
import {  useParams, useHistory } from "react-router-dom";
import AuthService from '../Services/AuthenticationService';


const GetPallet = props => {

    const departmentUser = localStorage.getItem("department");
    const [editable, setEditable] = useState(false);
    const initialPalletState = {
        id: null,
        description: "",
        location: "",
        department: "",
        collections: [],
        logs: []
    };
    const [pallet, setPallet] = useState(initialPalletState);
    const params = useParams();

    let history = useHistory();
    const fetchPallet = async () => {
        await PalletDataService.get(params.id).then(res => {
            if (localStorage.getItem("role") === "ROLE_EMPLOYEE" && departmentUser !== res.data.department) {
                history.push("/dashboard");
            }
            setPallet(res.data);
        });
    }
    const update = async (e) => {
        e.preventDefault()
        await PalletDataService.update(pallet.id, pallet).then(
            res => { 
                    if (AuthService.getCurrentUser().roles[0] !== "ROLE_ADMIN") {
                        history.push(`/departments/${localStorage.getItem("department")}/products`);
                    }
                    else {
                        setEditable(!editable);
                        props.onChangeView(true);
                    }

            }).catch(e => {
                console.log(e);
            })
        props.onChangeView(true);
        setEditable(false);
    }

    function handleChange(e) {
        const newData = { ...pallet };
        newData[e.target.id] = e.target.value;
        setPallet(newData);
    }

    const handleEditable = () => {
        setEditable(true);
        props.onChangeView(false);
    }

    useEffect(() => {
        fetchPallet();
    }, [params.id]);

    return (
        <div className="py-5 px-3">
            <div className="edit-form pb-1">
                <form className=''>
                    <div className="form-group py-1">
                        <label htmlFor="name"><strong>Description:</strong></label>
                        <input
                            readOnly={editable ? false : true}
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={pallet.description}
                        />
                    </div>
                    <div className="form-group w-20 py-1">
                        <label htmlFor="email">
                            <strong>Location:</strong>
                        </label>
                        <input
                            readOnly={editable ? false : true}
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            value={pallet.location}
                        />
                    </div>
                    <div className="form-group w-25 py-1">
                        <label htmlFor="department">Department:</label>
                            <input
                                readOnly={true}
                                type="text"
                                className="form-control"
                                id="department"
                                name="department"
                                value={pallet.department}
                            /> 
                    </div>

                </form>
                {editable ?
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button type="submit" className="badge badge-primary text-xl mr-2" onClick={(e) => update(e)}>
                            Update
                </button>
                    </div>
                    :
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button type="submit" className="badge badge-warning text-xl mr-2" onClick={() => handleEditable()}>
                            Edit Info
                        </button>
                    </div>
                }
            </div>
        </div>
    );

}

export default GetPallet;