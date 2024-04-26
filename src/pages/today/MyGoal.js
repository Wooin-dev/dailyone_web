import React, {useState} from 'react';
import {getPassedDays} from "../../util/dateUtil";
import ProgressCircle from "../../component/ProgressCircle";
import axios from "axios";
import {API_GOALS_MY_DELETE} from "../../constants/ApiEndpoint";
import {useNavigate} from "react-router-dom";

function MyGoal({goal}) {

    const navigate = useNavigate();
    const passedDays = getPassedDays(goal.createdAt) + 1 //시작한날이 1일차
    const [doneCount, setDoneCount] = useState(goal.doneCount);
    const progress = doneCount / passedDays;

    const [isDoneCliked, setIsDoneClicked] = useState(false);
    const doneClickHanlder = () => {
        if (doneCount < passedDays) {
            setDoneCount(doneCount + 1);
        }
        setIsDoneClicked(true);
    }

    const resetGoalBtnHandler = () => {
        axios.delete(API_GOALS_MY_DELETE,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => {
                    console.log(res);
                    navigate("/");
                }
            ).catch(e => {
            console.log(e)
        });
    }

    return (
        <div className={"flex flex-col h-full"}>
            <div className="text-center text-gray-400 mb-16">
                오늘의 Done
            </div>
            <div className="flex flex-col flex-grow items-center justify-evenly">
                <div className="wrap-goal flex flex-col w-full">
                    <div className="original-goal">
                        <p className={`goal-content ${isDoneCliked && "done-goal"} transition-all`}>{goal.simpleGoal}</p>
                    </div>
                    <div className="simple-goal popup-animation">
                        <p className={"goal-content original transition-all"}>{isDoneCliked ? goal.originalGoal : " "}</p>
                    </div>
                </div>
                <div className={"progress-wrap flex relative items-center justify-center mb-10"}>
                    <ProgressCircle progress={progress} size={130}/>
                    <div className={"progress-percent absolute text-center"}>
                        <p className={"text-2xl font-bold"}>{Math.round(progress * 100)}%</p>
                        <div className={"passed-days mt-1"}>{doneCount} / {passedDays}</div>
                    </div>
                </div>
                <div className="goal-info w-full px-5">
                    <div className={"content-wrap justify-between"}>
                        <div className="content-title">목표 시작일</div>
                        <div>{goal.createdAt && goal.createdAt.slice(0, 10)} ({passedDays}일차)</div>
                    </div>
                </div>
            </div>
            <div className="btn-col w-full mb-0 items-center">
                <div className="done-btn w-full">
                    {!isDoneCliked
                        ? <button className={"btn-main"} onClick={doneClickHanlder}>DONE</button>
                        : <button className={`btn-special ${isDoneCliked ? 'btn-show' : ''} popup-animation delay-100`}>
                            SUPER DONE</button>
                    }
                </div>
                <div>
                    <button className="btn-extra mt-0 p-0 w-fit" onClick={resetGoalBtnHandler}>목표 재설정하기</button>
                </div>
            </div>

        </div>
    );
}

export default MyGoal;
