import React, {useState} from 'react';
import {getPassedDays} from "../../util/dateUtil";
import ProgressCircle from "../../component/ProgressCircle";
import axios from "axios";
import {API_DONE_CLICK, API_PROMISE_GOALS_MY_DELETE} from "../../constants/ApiEndpoint";
import moment from "moment";

function MyGoal({promiseGoal, setMyPromiseGoal}) {

    const passedDays = getPassedDays(promiseGoal.promiseGoal.startDate) + 1 //시작한날이 1일차
    const [doneCount, setDoneCount] = useState(promiseGoal.doneCount);
    const progressValue = doneCount / promiseGoal.promiseGoal.promiseDoneCount;
    const progress = Math.min(progressValue, 1)

    const [isDoneClicked, setIsDoneClicked] = useState(promiseGoal.isDoneToday);

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


    const resetGoalBtnHandler = () => {
        axios.delete(API_PROMISE_GOALS_MY_DELETE,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => {
                    console.log(res);
                    setMyPromiseGoal(null);
                }
            ).catch(e => {
            console.log(e)
        });
    }

    return (
        <div className={"flex flex-col w-full h-full p-5"}>
            <div className="text-center text-gray-400 mb-16">
                오늘의 Done - {passedDays}일차
            </div>
            <div className="flex flex-col flex-grow items-center justify-evenly">
                <div className="wrap-goal flex flex-col w-full">
                    <div className="original-goal">
                        <p className={`goal-content ${isDoneClicked && "done-goal"} transition-all`}>{promiseGoal.goal.simpleGoal}</p>
                    </div>
                    <div className="simple-goal popup-animation">
                        <p className={"goal-content original transition-all"}>{isDoneClicked ? promiseGoal.goal.originalGoal : " "}</p>
                    </div>
                </div>
                <div className={"progress-wrap flex relative items-center justify-center mb-10"}>
                    <ProgressCircle progress={progress} size={130}/>
                    <div className={"progress-percent absolute text-center"}>
                        <p className={"text-2xl font-bold"}>{Math.round(progress * 100)}%</p>
                        <div className={"passed-days mt-1"}>{doneCount} / {promiseGoal.promiseGoal.promiseDoneCount}</div>
                    </div>
                </div>
                <div className="goal-info w-full px-5">
                    <div className={"content-wrap justify-between"}>
                        <div className="content-title">목표 달성률</div>
                        <div className="min-w-24">
                            {`${(moment(promiseGoal.promiseGoal.endDate) - moment(promiseGoal.promiseGoal.startDate))/(1000 * 60 * 60 * 24)+1}일 동안 
                            ${promiseGoal.promiseGoal.promiseDoneCount && promiseGoal.promiseGoal.promiseDoneCount}회`}
                        </div>
                    </div>
                    <div className={"content-wrap justify-between"}>
                        <div className="content-title">목표 시작일</div>
                        <div className="w-24">{promiseGoal.promiseGoal.createdAt && promiseGoal.promiseGoal.startDate}</div>
                    </div>
                    <div className={"content-wrap justify-between"}>
                        <div className="content-title">목표 종료일</div>
                        <div className={"w-24"}>{promiseGoal.promiseGoal.endDate && promiseGoal.promiseGoal.endDate}</div>
                    </div>
                </div>
            </div>
            <div className="btn-col w-full mb-0 items-center">
                <div className="done-btn w-full">
                    {!isDoneClicked
                        ? <button className={"btn-main"} onClick={doneClickHanlder}>DONE</button>
                        : <button className={`btn-special ${isDoneClicked ? 'btn-show' : ''} popup-animation delay-100`}>
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
