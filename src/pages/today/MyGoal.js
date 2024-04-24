import React, {useState} from 'react';
import {getPassedDays} from "../../util/dateUtil";
import ProgressCircle from "../../component/ProgressCircle";

function MyGoal({goal}) {

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

    return (
        <div className={"flex flex-col h-full"}>
            <div className="text-center text-gray-400 mb-16">
                오늘의 Done
            </div>
            <div className="flex-grow flex flex-col items-center">
                <div className="flex wrap-goal text-center font-bold mb-16">
                    <div>
                        <div className="original-goal">
                            <p className={`goal-content ${isDoneCliked && "done-goal"} transition-all`}>{goal.simpleGoal}</p>
                        </div>
                        {isDoneCliked &&
                            <div className="simple-goal popup-animation">
                                <p className={"goal-content original transition-all"}>{goal.originalGoal}</p>
                            </div>
                        }
                    </div>
                </div>
                <div className={"progress-wrap flex relative items-center justify-center"}>
                    <ProgressCircle progress={progress} size={130}/>
                    <div className={"progress-percent absolute text-center"}>
                        <p className={"text-2xl font-bold"}>{Math.round(progress * 100)}%</p>
                        <div className={"passed-days mt-1"}>{doneCount} / {passedDays}</div>
                    </div>
                </div>
            </div>
            <div className="mx-4 mb-10">
                {!isDoneCliked
                    ? <button className={"btn-main"} onClick={doneClickHanlder}>DONE</button>
                    :
                    <button className={`btn-special ${isDoneCliked ? 'btn-show' : ''} popup-animation delay-100`}>SUPER
                        DONE</button>
                }
            </div>
        </div>
    );
}

export default MyGoal;
