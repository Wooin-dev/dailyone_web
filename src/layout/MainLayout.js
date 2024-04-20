import React from 'react';
import TabBar from "../component/tabbar/TabBar";
import {Outlet} from "react-router-dom";
import Header from "../component/header/Header";

const MainLayout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <TabBar/>
        </>
    );
};

export default MainLayout;