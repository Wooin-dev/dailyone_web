import React, {useEffect} from 'react';
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../recoil/loginState";
import {Navigate, Outlet} from "react-router-dom";

function ProtectedRoute() {
    const isLogin = useRecoilValue(isLoginSelector);
    useEffect(() => {
        if (!isLogin) alert("로그인이 필요한 페이지입니다.");
        console.log("로그인 필요");
    }, [])
    return isLogin ?
        <Outlet/> : <Navigate to={'/login'}/>
}

export default ProtectedRoute;