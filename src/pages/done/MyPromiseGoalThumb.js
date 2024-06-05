import React, {useState} from 'react';
import {getPassedDays} from "../../util/dateUtil";
import axios from "axios";
import {API_DONE_CLICK, API_SUPER_DONE_CLICK} from "../../constants/ApiEndpoint";
import ProgressLine from "../../component/ProgressLine";
import {useNavigate} from "react-router-dom";

function MyPromiseGoalThumb({promiseGoal, onClickHandler}) {

    const passedDays = getPassedDays(promiseGoal.promiseGoal.startDate) + 1 //시작한날이 1일차
    const [doneCount, setDoneCount] = useState(promiseGoal.doneCount);
    const progressValueDone = doneCount / promiseGoal.promiseGoal.promiseDoneCount;
    const progressDone = Math.min(progressValueDone, 1)
    const [superDoneCount, setSuperDoneCount] = useState(promiseGoal.superDoneCount);
    const progressValueSuperDone = superDoneCount / promiseGoal.promiseGoal.promiseDoneCount;
    const progressSuperDone = Math.min(progressValueSuperDone, 1)

    const [isDoneClicked, setIsDoneClicked] = useState(promiseGoal.isDoneToday);
    const [isSuperDoneClicked, setIsSuperDoneClicked] = useState(promiseGoal.isSuperDoneToday);

    const navigate = useNavigate();
    const handleClick = (promiseGoal) => {
        navigate('/promise-goal', { state: { promiseGoal } });
    };
    const doneClickHanlder = () => {
        axios.post(`${API_DONE_CLICK}/${promiseGoal.promiseGoal.promiseGoalId}`,
            {},
            {
                headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
            }
        ).then(res => {
                console.log(res);
                if (doneCount < passedDays) {
                    setDoneCount(doneCount + 1);
                }
                setIsDoneClicked(true);
            }
        ).catch(e => {
            console.log(e)
        });
    }

    const superDoneClickHanlder = () => {
        axios.post(`${API_SUPER_DONE_CLICK}/${promiseGoal.promiseGoal.promiseGoalId}`,
            {},
            {
                headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
            }
        ).then(res => {
                console.log(res);
                if (superDoneCount < passedDays) {
                    setSuperDoneCount(superDoneCount + 1);
                }
                setIsSuperDoneClicked(true);
            }
        ).catch(e => {
            console.log(e)
        });
    }

    return (
        <div className={"flex flex-col w-full p-5 mt-5 bg-white rounded-lg"}
             key={promiseGoal.promiseGoal.promiseGoalId} onClick={() => handleClick(promiseGoal)}>
            <div className="text-gray-400">
                {passedDays}일차
            </div>
            <div className={"flex items-center justify-center"}>
                <div className="wrap-goal h-fit grow break-all px-2">
                    <div className="original-goal">
                        <div
                            className={`goal-content ${isDoneClicked && "done-goal"} transition-all`}>{promiseGoal.goal.simpleGoal}</div>
                    </div>
                    <div className="simple-goal popup-animation">
                        <div
                            className={`goal-content original line-clamp-2 ${isSuperDoneClicked && "super-done-goal"} transition-all`}>{isDoneClicked ? promiseGoal.goal.originalGoal : " "}</div>
                    </div>
                </div>
                <div className={"flex flex-col justify-center items-center flex-none min-w-14"}>
                    <ProgressLine progressDone={progressDone} progressSuperDone={progressSuperDone} size={50}/>
                    <div className={"progress-percent text-center"}>
                        <span className={"text-lg font-bold"}>{Math.round(progressDone * 100)}%</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-evenly z-10">
                <div className="btn-col w-full mb-0 items-center">
                    <div className="done-btn w-full m-0">
                        {!isDoneClicked &&
                            <button className={"btn-main"} onClick={(event
                            ) => {
                                event.stopPropagation();
                                doneClickHanlder();
                            }}>DONE</button>}
                        {!isSuperDoneClicked && isDoneClicked &&
                            <button
                                className={`btn-special ${isDoneClicked ? 'btn-show' : ''} popup-animation delay-100`}
                                onClick={(event
                                ) => {
                                    event.stopPropagation();
                                    superDoneClickHanlder();}}>
                                SUPER DONE</button>}
                        {isSuperDoneClicked &&
                            <button
                                className={`btn-finish ${isSuperDoneClicked ? 'btn-show' : ''} popup-animation delay-100 cursor-auto`}>
                                CLEAR 🔥🔥</button>}
                    </div>
                </div>
            </div>

        </div>
    )
        ;
}

export default MyPromiseGoalThumb;
