import React, {useState} from 'react';
import MyPromiseGoalThumb from "./MyPromiseGoalThumb";
import {FaPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import animationCongratsConfetti from "../../asset/lottie/animationCongratsConfetti.json";
import Lottie from "lottie-react";
import {FaCircleXmark} from "react-icons/fa6";


function MyPromiseGoalList({promiseGoalList}) {
    const [congratsMessage, setCongratsMessage] = useState(null);
    const navigate = useNavigate();

    const handleCongrats = (message) => {
        setCongratsMessage(message);
    };

    return (
        <div className={"flex flex-col w-full min-h-full relative bg-gray-100 items-center"}>
            <h2 className="w-full p-5 bg-white text-2xl font-bold text-gray-600 ">나의 D'ONE</h2>

            <div className={"px-4 w-full"}>
                {promiseGoalList != null && promiseGoalList.map((promiseGoal, index) => (
                    <MyPromiseGoalThumb key={index} promiseGoal={promiseGoal} onCongrats={handleCongrats}/>
                ))}
                <div
                    className={"mx-auto flex items-center justify-center rounded-full size-16 bg-[#0bb8bc] m-8 cursor-pointer"}
                    onClick={() => navigate("/create-goal")}
                >
                    <FaPlus className="size-8 fill-white "/>
                </div>
                {/*<button onClick={() => setCongratsMessage("해냈구나아")}>test</button>*/}
            </div>

            {congratsMessage && (
                <>
                    <div className="congrats-popup"/>
                    <div className="popup-content bg-white size-60 shadow-sm">
                        <div className={"flex flex-col size-full items-center justify-center relative "}>
                            <p className={"absolute top-5 text-sm"}>목표를 달성했어요!!</p>
                            <p className={"m-3 text-2xl font-bold"}>{congratsMessage}</p>
                            <Lottie className={"absolute"} animationData={animationCongratsConfetti} loop={false}/>
                            {/*<button className={"absolute bottom-3"} onClick={}>Close</button>*/}
                            <FaCircleXmark className={"absolute bottom-3 cursor-pointer size-8 fill-gray-300"} onClick={() => setCongratsMessage(null)} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default MyPromiseGoalList;
