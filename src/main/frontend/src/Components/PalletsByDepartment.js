import React, { useState, useEffect } from 'react';
import PalletDataService from "../Services/PalletService";
import { Link, useParams } from "react-router-dom";


const GetPalletsByDepartment = props => {

    const [pallets, setPallets] = useState([]);


    const fetchPallets = async() => {
        await PalletDataService.findByDepartment(props.name).then(res => {
            setPallets(res.data);
            props.emptyList(res.data.length === 0);
        });
    }
    const removeChosenOne = async (id) => {
        await PalletDataService.remove(id);
        fetchPallets();
    }

    useEffect(() => {
        fetchPallets();
    }, []);

    return pallets
        .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
        .map((pallet, index) => {

            return (
                <tr key={index}>
                    <td>
                        <Link to={`/pallets/${pallet.id}`} key={index}>
                            {pallet.id}
                        </Link>
                    </td>
                    <td>
                        {pallet.collections.map(c => c.product + ", ")}
                    </td>
                    <td>{pallet.department}</td>
                    <td>{pallet.location}</td>
                    {localStorage.getItem("role") === "ROLE_EMPLOYEE" ?
                        <td style={{ textAlign: "center" }}>
                            <button className="badge badge-danger mr-2" onClick={() => removeChosenOne(pallet.id)}>
                                X
                        </button>
                        </td>
                    : null}
                </tr>
            );
        });
}

export default GetPalletsByDepartment;