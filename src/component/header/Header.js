import React, {useEffect} from 'react';
import Notification from "./Notification";
import logo from '../../asset/done_logo.png'
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginSelector, UserTokenAtom} from "../../recoil/loginState";
import {IoPersonCircleOutline} from "react-icons/io5";

const Header = () => {
    const navigate = useNavigate();
    const isLogin = useRecoilValue(isLoginSelector);
    const [userInfo, setUserInfo] = useRecoilState(UserTokenAtom);

    useEffect(() => {
        const getUserFromToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setUserInfo(token);
            }
        };
        getUserFromToken();
    }, [setUserInfo]);


    return (
        <div className="pt-7 px-8 flex grow-0 justify-between items-center w-full
                        bg-gradient-to-r from-cyan-500 to-green-500">
            <div>
                <img src={logo} alt="logo" className="h-16 -mb-1.5 brightness-0 invert cursor-pointer" onClick={() => {
                    navigate("/")
                }}/>
            </div>
            <div className="flex gap-x-2">
                {isLogin &&
                    <Notification/>
                }
                <MyPageBtn/>
            </div>
        </div>
    );
}

const MyPageBtn = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center cursor-pointer" title="Mypage"
             onClick={() => {
                 navigate("/mypage")
             }}>
            <IoPersonCircleOutline className="size-8 fill-white"/>
        </div>
    )
}

export default Header;
