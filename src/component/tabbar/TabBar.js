import React from 'react';
import {FaRegSquareCheck, FaSquareCheck} from "react-icons/fa6";
import {FaCalendarCheck, FaRegCalendarCheck} from "react-icons/fa";
import {GoHome, GoHomeFill} from "react-icons/go";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {activeMenuKey} from "../../recoil/activeKeyMenuBtn";


const TabBar = () => {
    return (
        <div className="grow-0 tab-bar pt-1.5 pb-3">
            <Tap index={1} title="홈" link="/home"><GoHomeFill className="tab-icon"/><GoHome className="tab-icon"/></Tap>
            <Tap index={2} title="D'ONE" link="/done"><FaSquareCheck className="tab-icon"/><FaRegSquareCheck className="tab-icon"/></Tap>
            {/*<Tap index={2} title="Lounge" link="/lounge"><AiFillFire className="tab-icon size-9 mt-0.5"/><AiOutlineFire className="tab-icon size-9 mt-0.5"/></Tap>*/}
            <Tap index={3} title="달력" link="/calendar"><FaCalendarCheck className="tab-icon calendar"/><FaRegCalendarCheck className="tab-icon calendar"/></Tap>
        </div>
    );
}

const Tap = ({children, title, link, index}) => {
    const [activeKey, setActiveKey] = useRecoilState(activeMenuKey);
    const navigate = useNavigate();
    const [OnBtn, OffBtn] = React.Children.toArray(children);
    return (
        <div className="flex flex-col items-center w-24 cursor-pointer"
             onClick={()=>{navigate(link); setActiveKey(index)}}>
            <div>{activeKey && activeKey === index ? OnBtn : OffBtn}</div>
            <div className="tab-text text-[0.65rem]">{title}</div>
        </div>
    )
}

export default TabBar;
