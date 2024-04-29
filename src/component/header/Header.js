import React from 'react';
import Notification from "./Notification";
import logo from '../../asset/done_logo.png'
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../../recoil/loginState";

const Header = () => {
    const navigate = useNavigate();

    const isLogin = useRecoilValue(isLoginSelector);
    console.log(isLogin?"true":"flase");

    return (
        <div className="pt-5 px-8 flex grow-0 justify-between items-center w-full
                        bg-gradient-to-r from-cyan-500 to-green-500">
            <div>
                <img src={logo} alt="logo" className="h-16 brightness-0 invert cursor-pointer" onClick={() => {
                    navigate("/")
                }}/>
            </div>
            {isLogin &&
                <div>
                    <Notification/>
                </div>
            }
        </div>
    );
}

export default Header;
