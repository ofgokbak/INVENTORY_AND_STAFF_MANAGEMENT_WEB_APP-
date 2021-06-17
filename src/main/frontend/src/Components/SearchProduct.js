import React, { useState, useEffect } from 'react';
import ProductDataService from "../Services/ProductService";
import { Link } from "react-router-dom";


const SearchProducts = props => {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        await ProductDataService.search(props.term,props.department).then(res => {
            setProducts(res.data);
            props.emptyProductList(res.data.length === 0);
        });
    }
    useEffect(() => {
        fetchProducts();
    }, [props.term]);

    return products
        .map((product, index) => {
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
                        <td >{product.vendor}</td>
                        <td>
                            <Link to={`/departments/${product.department}/products`} key={index}>
                                {product.department}
                            </Link>
                        </td>
                    </tr>

                );


        });
}

export default SearchProducts;