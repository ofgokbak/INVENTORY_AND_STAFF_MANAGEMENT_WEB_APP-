import React, { useState, useEffect } from 'react';
import ProductDataService from "../Services/ProductService";
import PalletDataService from "../Services/PalletService";
import { Link, useParams, useHistory, Redirect } from "react-router-dom";

const NewCollection = props => {
    const initialCollectionState = {
        id: null,
        product: "",
        quantity: 0,
        maxCapacity: 0,
    };

    const [products, setProducts] = useState([]);
    const [absentProducts, setProductList] = useState([]);
    const [collection, setCollection] = useState(initialCollectionState);
    function handleAdd(product){
        setProducts(products.concat(product));
    }

    const fetchAvailableProducts = async () => {

        await PalletDataService.get(props.id).then(response => {
            ProductDataService.findByDepartment(response.data.department).then(res => {

                if (response.data.collections === null) {
                    setProductList(res.data);
                } else {

                    res.data.map(p => {
                        // console.log(p);
                        let itemExist = false
                        response.data.collections.map(item => {
                            if (item.product === p.title) {
                                return itemExist = true;
                            }
                        });
                        if (!itemExist) {
                            handleAdd(p.title);
                        }
                    })
                }
            })
        })
    }


    useEffect(() => {
        fetchAvailableProducts();
    }, [props.id]);


    const [editable, setEditable] = useState(false);

    const addProduct = async () => {

        console.log(collection)
        if (collection.product === "") {
            props.onChange("Please Select a Product!!");
        }
        else if (collection.quantity < 1) {
            props.onChange("Please insert a valid amount");
        }
        else {
            await PalletDataService.createNewCollection(props.id, collection);
            setEditable(false);
            props.onChangeCollection();
            fetchAvailableProducts();
        }

        console.log(props.messages);

    }

    const onEdit = () => {
     
        if (products.length!== 0 ||props.collections.length === 0) {
            setEditable(true);
        }
        else {
            props.onChange("All products exists in this pallet!");
        }
    }


    const handleProduct = e => {
        const name = e.target.value;
        setCollection({ ...collection, product: name });
        props.onChange("");

    }

    const handleQuantity = e => {
        const number = e.target.value
        setCollection({ ...collection, quantity: number, maxCapacity: number })
        props.onChange("");

    }


    return (
        <>
            {editable ?
                <tr>
                    <td></td>
                    <td style={{ textAlign: "center" }}>
                        <select
                            className="browser-default custom-select"
                            id="product"
                            name="product"
                            onChange={(e) => handleProduct(e)}>
                            <option value="">Select a product...</option>
                            {products.map((product, index) => {
                                console.log("here");
                                return (

                                    <option key={index} value={product} >{product}</option>
                                );
                            }
                            )}
                        </select>
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <input value={collection.quantity}
                            id="quantity"
                            name="quantity"
                            onChange={(e) => handleQuantity(e)}
                            style={{ textAlign: "center" }}
                        />
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <input value={collection.maxCapacity}
                            id="product"
                            name="product"
                            style={{ textAlign: "center" }}
                        />
                    </td>
                    <td style={{ textAlign: "center" }}>
                        <button
                            className={"btn btn-primary"}
                            onClick={() => addProduct()}

                        >
                            Add
                </button>
                    </td>
                </tr> :
                <button
                    className={"btn btn-primary mx-auto"}
                    onClick={() => onEdit()}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    Add Product
                </button>}

        </>);

}
export default NewCollection;