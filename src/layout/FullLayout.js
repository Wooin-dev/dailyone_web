import React from 'react';
import {Outlet} from "react-router-dom";

function FullLayout(props) {
    return (
        <>
            <Outlet/>
        </>
    );
}

export default FullLayout;