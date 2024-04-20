import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {UserInfoAtom} from "../recoil/loginState";
import axios from "axios";
import {API_USERS_LOGIN, API_USERS_SIGNUP} from "../constants/ApiEndpoint";

const Login = () => {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

    const navigate = useNavigate();
    function loginBtnHandler() {
        axios.post(`${API_USERS_LOGIN}`, {
            username: id,
            password: pwd
        }, {
            withCredentials: true
        }).then(res => {
            setUserInfo(res.data);
            localStorage.setItem('user-info', JSON.stringify(res.data));
            navigate('/',);
        }).catch(error => {
            alert(error)
            console.log(error)
        })
    }

    return (
        <div className="flex flex-col grow justify-center items-center h-full">
            <h1 className="text-3xl font-bold">Login</h1>

            <p>dfdf</p>




            <div>Login

                <div>
                    <div>
                        id: <input name={"id"} value={id} onChange={e => {
                        setId(e.target.value);
                    }}/>
                    </div>
                    <div>
                        pwd: <input name={"pwd"} value={pwd} type={"password"} onChange={e => {
                        setPwd(e.target.value)
                    }}/>
                    </div>
                    <button value={"로그인"} onClick={e => {
                        e.preventDefault();
                        loginBtnHandler();
                    }}>로그인
                    </button>



                </div>

                <button onClick={e => {
                    navigate('/sign-up');
                }}>회원가입
                </button>

                <div>
                    <br/>
                    {`id : ${id} / pwd : ${pwd}`}
                </div>
            </div>
        </div>
    );
}

export default Login;