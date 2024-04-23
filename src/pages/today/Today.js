import React, {useEffect} from 'react';
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../../recoil/loginState";
import {useNavigate} from "react-router-dom";
import MyGoal from "./MyGoal";
import CreateMyGoal from "./CreateMyGoal";

const myGoal = null;

// const myGoal = {
//     originalGoal: "매일 푸시업 10개",
//     simpleGoal: "매일 푸시업 1개",
//     doneToday: false,
//     goalDays: 12,
//     doneDays: 3
// }

const Today = () => {
    const isLogin = useRecoilValue(isLoginSelector);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            alert("not login");
            navigate("/start");
        }
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold">TODAY</h1>
            <div className="flex flex-col grow justify-center items-center h-full">
                {myGoal != null
                    ? <MyGoal goal={myGoal}/>
                    : <CreateMyGoal/>
                }
            </div>
        </>
    )
        ;
}

export default Today;