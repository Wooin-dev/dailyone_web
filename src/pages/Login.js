import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {UserTokenAtom} from "../recoil/loginState";
import axios from "axios";
import {API_USERS_LOGIN} from "../constants/ApiEndpoint";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userInfo, setUserInfo] = useRecoilState(UserTokenAtom);

    const navigate = useNavigate();

    function loginBtnHandler() {
        axios.post(`${API_USERS_LOGIN}`, {
            email: email,
            password: password
        }, {
            withCredentials: true
        }).then(res => {
            const token = res.data.result.token
            setUserInfo(token);
            localStorage.setItem('token', token);
            navigate('/');
        }).catch(error => {
            alert(error)
            console.log(error)
        });
    }

    return (
        <div className="flex flex-col grow justify-center items-center h-full w-full">
            <h1 className="text-3xl font-bold">Login</h1>

            <div className="flex flex-col items-center w-full px-16 my-12">
                <div className={"input-wrap"}>
                    <div className={"input-title"}>이메일 계정</div>
                    <input name={"id"} value={email} onChange={e => {
                        setEmail(e.target.value);
                    }}/>
                </div>
                <div className={"input-wrap"}>
                    <div className={"input-title"}>비밀번호</div>
                    <input name={"password"} value={password} type={"password"} onChange={e => {
                        setPassword(e.target.value)
                    }}/>
                </div>

                <div className="btn-col mt-10">
                    <button className="btn-main" value={"로그인"} onClick={e => {
                        e.preventDefault();
                        loginBtnHandler();
                    }}>로그인
                    </button>
                    <button className="btn-sub" onClick={e => {
                        navigate('/join');
                    }}>회원가입
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;