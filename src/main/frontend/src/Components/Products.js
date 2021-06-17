import React, { useState, useEffect } from 'react';
import ProductDataService from "../Services/ProductService";
import { Link } from "react-router-dom";


const GetProducts = props => {

    const [products, setProducts] = useState([]);
    const [vendor, getProductsByVendor] = useState("");

    const fetchProducts = async () => {
        await ProductDataService.getAll().then(res => {
            setProducts(res.data);
            props.emptyList(res.data.length === 0);
        });
    }
    useEffect(() => {
        fetchProducts();
        console.log(products)
    }, []);


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
                        <td>
                            <Link to={`/departments/${product.department}/products`} key={index}>
                                {product.department}
                            </Link>
                        </td>
                    </tr>

                );
            }


        });
}

export default GetProducts;