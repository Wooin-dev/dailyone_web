import React from 'react';
import Notification from "./Notification";
import logo from '../../asset/done_logo.png'
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="pt-5 px-8 flex grow-0 justify-between items-center w-full
                        bg-gradient-to-r from-cyan-500 to-green-500">
            <div>
                <img src={logo} alt="logo" className="h-16 brightness-0 invert cursor-pointer" onClick={() => {navigate("/")}}/>
            </div>
            <div>
                <Notification />
            </div>
        </div>
    );
}

export default Header;
