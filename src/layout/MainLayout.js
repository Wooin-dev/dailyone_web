import React from 'react';
import TabBar from "../component/tabbar/TabBar";
import {Outlet} from "react-router-dom";
import Header from "../component/header/Header";

const MainLayout = () => {
    return (
        <>
            <Header/>
            <div className={"w-full h-fit relative flex-grow overflow-auto"}>
                <Outlet/>
            </div>
            <TabBar/>
        </>
    );
};

export default MainLayout;