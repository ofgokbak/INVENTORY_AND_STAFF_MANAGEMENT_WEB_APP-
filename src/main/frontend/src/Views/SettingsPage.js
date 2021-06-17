import React from "react";
import { Redirect } from 'react-router-dom';
import GetSettings from "../Components/Settings";

function SettingsPage() {

    if (!localStorage.getItem("user")) {
        return <Redirect to="/" />
    }
    else {
        return(
        <GetSettings/>
        );
    }

}
export default SettingsPage;