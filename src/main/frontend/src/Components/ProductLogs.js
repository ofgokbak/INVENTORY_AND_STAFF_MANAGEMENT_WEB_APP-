import React, { useState, useEffect } from 'react';
import ProductDataService from "../Services/ProductService";
import { Link } from "react-router-dom";


const GetProductLogs = props => {

    const [logs, setLogs] = useState([]);

    
    useEffect(() => {
        const fetchLogs = async () => {
            await ProductDataService.getLogs(props.id).then(res => {
                setLogs(res.data);
            });
        };
        fetchLogs();
    }, [props.id]);
let number = 1
    return logs
        .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
        .map((log, index) => {

            return (
                <tr key={index}>
                    <td>{number++}</td>
                    <td style={{ color: 'blue', textAlign: 'center' }}>
                        <Link to={`/pallets/${log.palletId}`} key={index}>

                            {log.palletId}
                        </Link>
                    </td>
                    <td>{log.amount}</td>
                    <td>{log.date}</td>
                    <td>{log.logType}</td>
                </tr>
            );
        });
}

export default GetProductLogs;