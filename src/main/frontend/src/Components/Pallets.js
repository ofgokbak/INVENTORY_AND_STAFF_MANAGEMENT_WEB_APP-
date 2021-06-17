import React, { useState, useEffect } from 'react';
import PalletDataService from "../Services/PalletService";
import { Link } from "react-router-dom";


function GetPallets() {

    const [pallets, setPallets] = useState([]);
    const fetchPallets = async () => {
        await PalletDataService.getAll().then(res => {
            setPallets(res.data);
        });
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
                        <Link to={`/pallets/${pallet.id}`} key={index}>
                        {pallet.collections.map(c => c.product + ", ")}
                        </Link>
                    </td>
                    <td>{pallet.department}</td>
                    <td>{pallet.location}</td>
                </tr>
            );
        });
}

export default GetPallets;