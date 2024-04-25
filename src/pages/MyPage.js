import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_USERS_MYINFO} from "../constants/ApiEndpoint";
import {IoPersonCircleSharp} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {UserTokenAtom} from "../recoil/loginState";


function MyPage(props) {
    const navigate = useNavigate();

    const [myInfo, setMyInfo] = useState({});
    const getMyInfo = () => {
        axios.get(`${API_USERS_MYINFO}`,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => {
                setMyInfo(res.data.result);
                console.log(res.data.result);
            }).catch(e => {
            console.log(e);
        })
    }
    useEffect(() => {
        getMyInfo();
    }, []);


    const setUserTokenAtom = useSetRecoilState(UserTokenAtom);
    const logoutBtnOnClickHandler = () => {
        setUserTokenAtom(undefined);
        localStorage.removeItem('token');
        navigate("/");
    }


    return (
        <div className="w-full h-full flex flex-col p-4">

            <div className={"mypage-profile"}>
                <div><IoPersonCircleSharp className={"size-20 fill-gray-400"}/></div>
                <div className="text-2xl font-bold">{myInfo.nickname}</div>
            </div>
            <div className={"flex-grow mx-10"}>
                <div className="content-wrap">
                    <p className={"content-title"}>이메일</p>
                    <div>{myInfo.email}</div>
                </div>
                <div className={"content-wrap"}>
                    <p className={"content-title"}>회원가입일</p>
                    <div>{myInfo.createdAt && (myInfo.createdAt).slice(0, 10)}</div>
                </div>
            </div>

            <button className="btn-extra" onClick={logoutBtnOnClickHandler}>로그아웃</button>

        </div>
    );
}

export default MyPage;
