import React, { useState, useEffect } from 'react';
import ProductDataService from "../Services/ProductService";
import { Link, useParams } from "react-router-dom";
import AuthService from "../Services/AuthenticationService";


const GetProductsByDepartment = props => {

    const [products, setProducts] = useState([]);
    const [vendor, getProductsByVendor] = useState("");

    let params = useParams();

    const fetchProducts = async () => {
        await ProductDataService.findByDepartment(params.name).then(res => {
            setProducts(res.data);
            props.emptyList(res.data.length === 0);
        });
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    const removeProduct = async (barcode) => {
        await ProductDataService.remove(barcode).then(res => {
            fetchProducts();
        })
    }

    return products
        .map((product, index) => {
            if (vendor === "" || (vendor !== "" && vendor === product.vendor)) {
                return (
                    <tr key={index}>
                        <td>
                            <Link to={`/products/${product.barcode}`} key={index}>
                                {product.barcode}
                            </Link>
                        </td>
                        <td>
                            <Link to={`/products/${product.barcode}`} key={index}>
                                {product.title}
                            </Link>
                        </td>
                        <td>{product.weight}</td>
                        <td onClick={() => getProductsByVendor(product.vendor)}>{product.vendor}</td>
                        {localStorage.getItem("role") === "ROLE_EMPLOYEE" ?
                            <td style={{ textAlign: "center" }}>
                                <button className="badge badge-danger mr-2" onClick={() => removeProduct(product.barcode)}>
                                    X
                                </button>
                            </td> : null
                        }
                    </tr>

                );
            }
        });
}

export default GetProductsByDepartment;