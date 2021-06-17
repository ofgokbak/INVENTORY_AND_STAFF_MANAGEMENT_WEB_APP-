import React, { useState } from 'react';
import PalletDataService from "../Services/PalletService";
// import { useParams, useHistory } from "react-router-dom";


const GetProductCollections = props => {

    const params = props.id;
    const palletId = props.id;
   
   
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [currentQuantity, setQuantity] = useState(null);


    const onEdit = ({ id, quantity }) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setQuantity(quantity);
        props.onChange("");
    }

  
    const updateInventory = async({id, newQuantity}) => {

        await PalletDataService.updateCollection(palletId,id,newQuantity).then(res => {
            props.onChangeCollection();
            // window.location.reload(false);
            onCancel();
        })
    }
    
 
    const onSave = ({ id, newQuantity, maxCapacity }) => {
        if(newQuantity> maxCapacity || newQuantity < 0)
        {
            props.onChange("Out of Capacity!!");
            setQuantity(maxCapacity);
        }
        else{
            updateInventory({ id, newQuantity });
            props.onChange("");
            // history.push(`/pallets/`);
        }
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setQuantity(null);
        props.onChange("");
    }


    return props.collections
        .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
        .map((productCollection, index) => {
            return (
                <tr key={index}>
                    <td className=" font-weight-bold" style={{ textAlign: "center" }}>
                        {/* <Link to={`/products/${product.id}`} key={index}> */}
                        <u>  {productCollection.id} </u>
                        {/* </Link> */}
                    </td>
                    <td style={{ textAlign: "center" }}>
                        {/* <Link to={`/products/${product.barcode}`} key={index}> */}
                        {productCollection.product}
                        {/* </Link> */}
                    </td>
                    <td style={{ textAlign: "center" }}>
                        {
                            inEditMode.status && inEditMode.rowKey === productCollection.id ? (
                                <input value={currentQuantity}
                                    onChange={(event) => setQuantity(event.target.value)}
                                    style={{ textAlign: "center" }}
                                />
                            ) : (
                                    productCollection.quantity
                                )
                        }

                    </td>
                    <td style={{ textAlign: "center" }}>{productCollection.maxCapacity}</td>
                    <td style={{ textAlign: "center" }}>
                        {
                            inEditMode.status && inEditMode.rowKey === productCollection.id ? (
                                <React.Fragment>
                                    <button
                                        className={"btn btn-success"}
                                        onClick={() => onSave({ id: productCollection.id, newQuantity : currentQuantity, maxCapacity: productCollection.maxCapacity})}
                                    >
                                        Save
                                            </button>

                                    <button
                                        className={"btn btn-danger"}
                                        style={{ marginLeft: 8 }}
                                        onClick={() => onCancel()}
                                    >
                                        Cancel
                                            </button>
                                </React.Fragment>
                            ) : (
                                
                                    <button
                                        className={"btn btn-primary"}
                                        onClick={() => onEdit({ id: productCollection.id, quantity: productCollection.quantity })}
                                    >
                                        Edit
                                    </button>  
                                
                                )
                        }
                    </td>
                </tr>
            );
        });
}
export default  GetProductCollections;

