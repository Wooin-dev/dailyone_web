import React from 'react';
import {FaRegSquareCheck} from "react-icons/fa6";
import {IoPersonCircleOutline} from "react-icons/io5";
import {FaRegCalendarCheck} from "react-icons/fa";
import {useNavigate} from "react-router-dom";


const TabBar = () => {


    return (
        <div className="grow-0 tab-bar text-2xl h-fit py-3">
            <Tap title="D'ONE" link="/done"><FaRegSquareCheck className="tab-icon"/></Tap>
            <Tap title="Calendar" link="/calendar"><FaRegCalendarCheck className="tab-icon calendar"/></Tap>
            <Tap title="Mypage" link="/mypage"><IoPersonCircleOutline className="tab-icon"/></Tap>
        </div>
    );
}

const Tap = ({children, title, link}) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center w-24 cursor-pointer"
             onClick={()=>{navigate(link)}}>
            <div>{children}</div>
            <div className="tab-text text-[0.85rem] font-bold">{title}</div>
        </div>
    )
}

export default TabBar;