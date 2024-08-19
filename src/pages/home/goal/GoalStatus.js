import React from 'react';
import {GrGroup} from "react-icons/gr";
import {FaRegCircleCheck} from "react-icons/fa6";
import {IoEyeOutline} from "react-icons/io5";

const GoalStatus = ({challengersCount, totalDoneCount, viewCount}) => {
    return (
        <div className="flex justify-around pt-2 text-sm">
            <div className="flex items-center gap-x-1">
                <GrGroup/>{challengersCount}
            </div>
            <div className="flex items-center gap-x-1"><FaRegCircleCheck className="py-[1px]"/>
                {totalDoneCount}
            </div>
            <div className="flex items-center gap-x-1"><IoEyeOutline/>
                {viewCount}
            </div>
        </div>
    );
}

export default GoalStatus;
