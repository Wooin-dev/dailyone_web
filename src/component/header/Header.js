import React from 'react';
import Notification from "./Notification";
import logo from '../../asset/done_logo.png'
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../../recoil/loginState";
import {IoPersonCircleOutline} from "react-icons/io5";

const Header = () => {
    const navigate = useNavigate();

    const isLogin = useRecoilValue(isLoginSelector);

    return (
        <div className="pt-5 px-8 flex grow-0 justify-between items-center w-full
                        bg-gradient-to-r from-cyan-500 to-green-500">
            <div>
                <img src={logo} alt="logo" className="h-16 brightness-0 invert cursor-pointer" onClick={() => {
                    navigate("/")
                }}/>
            </div>
            {isLogin &&
                <div className="flex gap-x-2">
                    <Notification/>
                    <MyPageBtn/>
                </div>
            }
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
