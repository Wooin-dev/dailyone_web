import React from 'react';
import Lottie from "lottie-react";
import animationCheckList from "../../asset/lottie/animationCheckList.json";
import {useNavigate} from "react-router-dom";

function NoGoal() {

    const navigate = useNavigate();
    const onLoopCompleteHandler = () => {
        setTimeout(() => {
            navigate("/create-goal");
        }, 2000);
    };


    return (
        <div className={"flex flex-col size-full  items-center"}>
            <div className={"w-full mt-10 text-center"}>
                <Lottie animationData={animationCheckList} onLoopComplete={onLoopCompleteHandler}/>
                <h1 className="mb-2">설정된 목표가 없네요!</h1>
                <h4>나의 목표를 만들어 볼까요?</h4>
            </div>
            <p>

            </p>
        </div>
    );
}

export default NoGoal;
