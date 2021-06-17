import React,{ useState, useEffect} from "react";
import { Table } from 'react-bootstrap';
import Sidebar from "../Components/Sidebar";
import { Redirect,useParams, useHistory } from 'react-router-dom';
import ProductDataService from "../Services/ProductService";
import GetProductLogs from '../Components/ProductLogs';

function ProductLogsPage() {

    const[product,setProduct] = useState("");
    let params = useParams();
    
    let productBarcode = params.barcode;

    const getProduct = async (barcode) => {
        await ProductDataService.get(barcode)
            .then(response => {
                setProduct(response.data.title);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getProduct(productBarcode);
    }, []);

   
    let history = useHistory();

    if (!localStorage.getItem("user")) {
        return <Redirect to="/" />
    }else if (localStorage.getItem("role") === "ROLE_EMPLOYEE" && localStorage.getItem("department") !== product.department) {
        history.push("/dashboard");
    }


    else {
        return (
            <>
                <Sidebar />
                <div className='mt-20 w-50 rounded overflow-hidden shadow-lg container mb-5'>
                    <h1 className='text-center py-2' style={{ "fontSize": "40px" }}><strong>{product}'s Logs</strong></h1>

                    <Table striped bordered hover className="w-75 container my-5">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Pallet-Id</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <GetProductLogs id={productBarcode}/>
                            
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}
export default ProductLogsPage;