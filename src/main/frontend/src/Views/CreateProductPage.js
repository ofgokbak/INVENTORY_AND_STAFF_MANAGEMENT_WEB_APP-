import React from 'react';
import CreateProduct from '../Components/CreateProduct';
import Sidebar from '../Components/Sidebar';
import { Redirect } from 'react-router-dom';

function CreateProductPage() {
    if (!localStorage.getItem("user")) {
        return <Redirect to="/" />
      }
    else if (localStorage.getItem("role") !== "ROLE_EMPLOYEE") {
        return <Redirect to="/dashboard" />
    }
    return (
        <>
        <Sidebar/>
        <div>
            <CreateProduct/>
        </div>
        </>
    )
}

export default CreateProductPage