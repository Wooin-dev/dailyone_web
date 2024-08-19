import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {bgColor} from "../../../constants/Temp";
import GoalStatus from "./GoalStatus";
import axios from "axios";
import {API_GOALS_SELECT_THUMBS} from "../../../constants/ApiEndpoint";
import {getPassedTimeBySection} from "../../../util/dateUtil";

function GoalList() {

    const [goalThumbsList, setGoalThumbsList] = useState([]);

    useEffect(() => {
        selectGoalThumbsList();
    }, []);

    const selectGoalThumbsList = () => {
        axios.get(`${API_GOALS_SELECT_THUMBS}`)
            .then(res => {
                console.log(res.data.result);
                setGoalThumbsList(res.data.result.goalThumbResponses);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <div className="">
            <div className="border-b-[1px]">
                {/*<h2>🔥 목표</h2>*/}
            </div>
            {goalThumbsList && goalThumbsList.map((thumb, index)  => (
                <div key={index}>
                    <GoalThumb goalId={thumb.goalId} author={thumb.nickname} createdAt={thumb.createdAt}
                               simpleGoal={thumb.simpleGoal} originalGoal={thumb.originalGoal}
                               challengersCount={thumb.challengersCount} totalDoneCount={thumb.doneCount} viewCount={thumb.viewCount}
                               bgColor={bgColor[thumb.goalId % bgColor.length]}/>
                </div>
            ))}
        </div>
    );
}


const GoalThumb = ({
                       goalId,
                       author,
                       simpleGoal,
                       originalGoal,
                       createdAt,
                       challengersCount,
                       totalDoneCount,
                       viewCount,
                       bgColor
                   }) => {



    // const createdAtBefore = getTimeDifference(createdAt);
    // console.log(createdAtBefore);
    // const createdAtBefore = '3분';
    const navigate = useNavigate();

    return (
        <div className="py-3 px-8 border-b-[0.5px] cursor-pointer" onClick={e => {
            e.preventDefault();
            navigate(`/goal/${goalId}`)
        }}>
            <div className="flex items-center py-1 mb-2">
                <div
                    className={`mr-2 flex items-center justify-center ${bgColor} bg- size-6 text-center rounded-full`}>{author !== null ? author.substring(0, 1) : "D"}
                </div>
                <div className="text-xs font-semibold text-gray-800 mr-1">{author}</div>
                <div className="text-[0.7rem] text-gray-400">{getPassedTimeBySection(createdAt)}</div>
            </div>
            <div className="mb-2 ml-1">
                <div className="text-xl font-bold mb-1">{simpleGoal}</div>
                <div className="text-sm flex items-center">
                    <div
                        className="bg-gray-100 text-gray-400 font-bold rounded-r-full text-[0.55rem] py-0 pl-1 pr-1.5 mr-1">SUPER
                    </div>
                    {originalGoal}
                </div>
            </div>
            <GoalStatus challengersCount={challengersCount} totalDoneCount={totalDoneCount} viewCount={viewCount}/>
        </div>
    );
}


export default GoalList;
