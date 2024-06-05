import React from 'react';
import MyPromiseGoalThumb from "./MyPromiseGoalThumb";
import {FaPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";


function MyPromiseGoalList({promiseGoalList}) {

    const navigate = useNavigate();

    return (
        <div className={"flex flex-col w-full bg-gray-100 items-center"}>
            <h2 className="w-full p-5 bg-white text-2xl font-bold text-gray-600 ">나의 D'ONE</h2>

            <div className={"px-4 w-full"}>
                {promiseGoalList != null && promiseGoalList.map((promiseGoal) => (
                    <MyPromiseGoalThumb promiseGoal={promiseGoal} />
                ))}
                <div className={"mx-auto flex items-center justify-center rounded-full size-16 bg-[#0bb8bc] m-8 cursor-pointer"}
                     onClick={() => navigate("/create-goal")}>
                    <FaPlus className="size-8 fill-white "/>
                </div>
            </div>
        </div>
    );
}

export default MyPromiseGoalList;
