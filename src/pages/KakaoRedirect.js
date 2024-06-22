import React, {useEffect} from 'react';
import LoadingPage from "./loading/LoadingPage";
import axios from "axios";
import {useRecoilState} from "recoil";
import {UserTokenAtom} from "../recoil/loginState";
import {useNavigate} from "react-router-dom";
import {KAKAO_LOGIN_URL} from "../constants/OAuth";

function KakaoRedirect(props) {
    const [userInfo, setUserInfo] = useRecoilState(UserTokenAtom);
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        loginBtnHandler();
    }, []);
    function loginBtnHandler() {
        axios.get(`${KAKAO_LOGIN_URL}?code=${code}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => {
            const token = res.data.result.token
            setUserInfo(token);
            localStorage.setItem('token', token);
            navigate('/');
        }).catch(error => {
            console.log(error)
            if (error.response.status === 404) {
                alert("로그인에 실패하였습니다");
            }
        });
    }

    return (
        <div className="size-full">
            <LoadingPage/>
        </div>
    );
}

export default KakaoRedirect;
