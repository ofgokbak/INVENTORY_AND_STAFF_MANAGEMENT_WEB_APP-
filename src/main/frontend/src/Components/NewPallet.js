import React, { useState, useEffect } from 'react';
import PalletDataService from "../Services/PalletService";
import DepartmentDataService from "../Services/DepartmentService";
import { Link, useParams } from "react-router-dom";
import AuthService from '../Services/AuthenticationService';


const NewPallet = props => {

    const [editable, setEditable] = useState(false);
    const [pallet, setPallet] = useState(props.pallet);
    
    const [handle, setHandle] = useState(false);
    // const params = useParams();

    // const fetchPallet = async () => {
    //     await PalletDataService.get(params.id).then(res => {
    //         setPallet(res.data);
    //     });
    // }
    let history = useParams();
    const update = async (e) => {
        // e.preventDefault()
        // await PalletDataService.update(pallet.id, pallet).then(
        //     res => { 
        //             if (AuthService.getCurrentUser().roles[0] !== "ROLE_ADMIN") {
        //                 history.push(`/departments/${localStorage.getItem("department")}/products`);
        //             }
        //             else {
        //                 setEditable(!editable);
        //                 props.onChangeView(true);
        //             }

        //     }).catch(e => {
        //         console.log(e);
        //     })
        // props.onChangeView(true);
        // setEditable(false);
    }

    function handleChange(e) {
        const newData = { ...pallet };
        newData[e.target.id] = e.target.value;
        setPallet(newData);
    }

    const addPallet = async(e) => {
        e.preventDefault();
        await PalletDataService.create(pallet).then(res=> {
            props.onChangePallet(res.data);
            setEditable(true);
            props.onChangeView(true);
        });
        
    }

    

    return (
        <div className="py-5 px-3">
            <div className="edit-form pb-1">
                <form className='' onSubmit = {(e) => addPallet(e)}>
                    <div className="form-group py-1">
                        <label htmlFor="name"><strong>Description:</strong></label>
                        <input
                            // readOnly={editable ? false : true}
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            required
                            value={pallet.description}
                        />
                    </div>
                    <div className="form-group w-20 py-1">
                        <label htmlFor="email">
                            <strong>Location:</strong>
                        </label>
                        <input
                            // readOnly={editable ? false : true}
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="form-control"
                            id="location"
                            name="location"
                            required
                            value={pallet.location}
                        />
                    </div>
                    <div className="form-group w-25 py-1">
                        <label htmlFor="department">Department:</label>
                        {/* {!editable ? */}
                            <input
                                readOnly={true}
                                type="text"
                                className="form-control"
                                id="department"
                                name="department"
                                value={localStorage.getItem("department")}
                            /> 
                            {/* :
                            <select

                                className="browser-default custom-select"
                                id="department"
                                name="department"
                                onChange={(e) => handleDepartment(e)}>
                                <option defaultValue={pallet.department} >{pallet.department}</option>
                                {departments.map((department, index) => {
                                    if ((department.name !== pallet.department) && (department.name !== "Administration")) {
                                        return (
                                            <option key={index} value={department.name}>{department.name}</option>
                                        );
                                    }
                                    return null;
                                }
                                )}
                            </select> */}
                        {/* } */}
                    </div>

                    {!editable ?
                    <div  style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <button type="submit" className="badge badge-warning text-xl mr-2">
                            Load Products
                        </button>
                    </div>
                    : null
                }
                </form>
                
            </div>
        </div>
    );

}

export default NewPallet;