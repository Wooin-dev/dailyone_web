import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginSelector, UserTokenAtom} from "../recoil/loginState";
import {Navigate, Outlet} from "react-router-dom";
import LoadingDots from "./loading/LoadingDots";

function ProtectedRoute() {
    const isLogin = useRecoilValue(isLoginSelector);
    const [userInfo, setUserInfo] = useRecoilState(UserTokenAtom);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserFromToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setUserInfo(token);
                console.log(token);
            }
            setLoading(false);
        };
        getUserFromToken();
    }, [setUserInfo]);

    useEffect(() => {
        if (!isLogin) {
            // alert("로그인이 필요한 페이지입니다.");
            console.log("로그인 필요");
        }
        else {
            console.log("로그인됐군요");
        }
    }, [userInfo]);

    if(loading) {
        return <LoadingDots />
    }

    return isLogin ?
        <Outlet/> : <Navigate to={'/login'}/>
}

export default ProtectedRoute;
