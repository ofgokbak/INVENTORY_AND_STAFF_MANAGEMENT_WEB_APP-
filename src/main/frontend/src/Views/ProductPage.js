import React from "react";
import Sidebar from "../Components/Sidebar";
import { Redirect } from 'react-router-dom';
import GetProduct from '../Components/Product';

function ProductPage() {
    if (!localStorage.getItem("user")) {
        return <Redirect to="/" />
      }

    return (
        <>
        <Sidebar/>
        <div>
            <GetProduct/>
        </div>
        </>
    )
}
export default ProductPage;