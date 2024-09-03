import React, {useState} from 'react';
import {getPassedDays} from "../../util/dateUtil";
import ProgressCircle from "../../component/ProgressCircle";
import axios from "axios";
import {API_DONE_CLICK, API_PROMISE_GOALS_DELETE, API_SUPER_DONE_CLICK} from "../../constants/ApiEndpoint";
import moment from "moment";
import {useLocation, useNavigate} from "react-router-dom";
import {IoArrowBack} from "react-icons/io5";
import {GrGroup} from "react-icons/gr";
import Lottie from "lottie-react";
import animationFireFloor from "../../asset/lottie/animationFireFloor.json";
import {FaCircleXmark} from "react-icons/fa6";

function MyPromiseGoal() {
    const navigate = useNavigate();
    const location = useLocation();
    const promiseGoal = location.state?.promiseGoal;

    const promiseDoneCount =
        promiseGoal.promiseGoal.endDate ? (
            `${promiseGoal.promiseGoal.promiseDoneCount && promiseGoal.promiseGoal.promiseDoneCount}`
        ) : (
            `${(moment(new Date().toDateString()) - moment(promiseGoal.promiseGoal.startDate)) / (1000 * 60 * 60 * 24) + 1}`
        )

    const passedDays = getPassedDays(promiseGoal.promiseGoal.startDate) + 1 //시작한날이 1일차
    const [doneCount, setDoneCount] = useState(promiseGoal.doneCount);
    const progressValueDone = doneCount / promiseDoneCount;
    const progressDone = Math.min(progressValueDone, 1)
    const [superDoneCount, setSuperDoneCount] = useState(promiseGoal.superDoneCount);
    const progressValueSuperDone = superDoneCount / promiseDoneCount;
    const progressSuperDone = Math.min(progressValueSuperDone, 1)

    const [isDoneClicked, setIsDoneClicked] = useState(promiseGoal.isDoneToday);
    const [isSuperDoneClicked, setIsSuperDoneClicked] = useState(promiseGoal.isSuperDoneToday);

    const [motivationMessage, setMotivationMessage] = useState(null);

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


    const resetGoalBtnHandler = () => {
        axios.delete(`${API_PROMISE_GOALS_DELETE}/${promiseGoal.promiseGoal.promiseGoalId}`,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => {
                    console.log(res);
                    navigate("/done");
                }
            ).catch(e => {
            console.log(e)
        });
    }

    return (
        <div className={"flex flex-col w-full h-full py-3 px-5"}>
            <div className="flex items-center relative mb-5">
                <IoArrowBack className="absolute size-6 fill-gray-300 cursor-pointer" onClick={() => navigate(-1)}/>
                <div className="text-center w-full text-gray-700 text-sm"><span className="font-bold">{promiseGoal.goal.user.nickname}</span>님이 처음 만든 목표 - {passedDays}일차</div>
                <GrGroup className="absolute right-0 size-6 pt-0.5 cursor-pointer" onClick={() => {navigate(`/goal/${promiseGoal.goal.id}`)}}/>
            </div>
            <div className="flex flex-col flex-grow items-center justify-evenly">
                <div className="wrap-goal flex flex-col w-full h-fit mb-3">
                    <div className="original-goal">
                        <p className={`goal-content ${isDoneClicked && "done-goal"} transition-all`}>{promiseGoal.goal.simpleGoal}</p>
                    </div>
                    <div className="simple-goal popup-animation">
                        <p className={`goal-content original break-all ${isSuperDoneClicked && "super-done-goal"} transition-all`}>{isDoneClicked ? promiseGoal.goal.originalGoal : " "}</p>
                    </div>
                </div>
                <div className="w-full flex items-center justify-around">
                    <div className="flex rounded-full border-gray-100 border-[0.5px] shadow-md size-10 items-center justify-center cursor-pointer"
                    onClick={() => {setMotivationMessage(promiseGoal.goal.motivationComment);}}>🔥</div>
                    {motivationMessage && (
                        <>
                            <div className="congrats-popup cursor-pointer" onClick={()=>setMotivationMessage(null)}/>
                            <div className="popup-content bg-white size-60 shadow-sm z-10 overflow-y-hidden" >
                                <div className={"flex flex-col size-full items-center justify-center relative "}>
                                    {/*<p className={"absolute top-5 text-sm"}>목표를 달성했어요!!</p>*/}
                                    <p className={"m-3 text-2xl font-bold text-center z-20"}>{motivationMessage}</p>
                                    <Lottie className={"absolute -bottom-5 "} animationData={animationFireFloor} loop={true}/>
                                    <FaCircleXmark className={"absolute bottom-3 cursor-pointer size-9 bg-white p-1 rounded-full shadow-lg fill-gray-500"} onClick={() => setMotivationMessage(null)} />
                                </div>
                            </div>
                        </>
                    )}
                    <div className={"progress-wrap flex relative items-center justify-center"}>
                        <ProgressCircle progressDone={progressDone} progressSuperDone={progressSuperDone} size={130}/>
                        <div className={"progress-percent absolute text-center"}>
                            <p className={"text-2xl font-bold"}>{Math.round(progressDone * 100)}%</p>
                            <div
                                className={"passed-days mt-1"}>{doneCount} / {promiseDoneCount}</div>
                        </div>
                    </div>
                    <div className="flex rounded-full size-8 items-center justify-center"></div>
                </div>

                <div className="goal-info w-full px-5">
                    <div className={"content-wrap justify-between"}>
                        <div className="content-title">목표 시작일</div>
                        <div
                            className="w-24">{promiseGoal.promiseGoal.createdAt && promiseGoal.promiseGoal.startDate}</div>
                    </div>
                    {promiseGoal.promiseGoal.endDate &&
                        <div className={"content-wrap justify-between"}>
                            <div className="content-title">목표 종료일</div>
                            <div
                                className={"w-24"}>{promiseGoal.promiseGoal.endDate}</div>
                        </div>
                    }

                    <div className={"content-wrap justify-between"}>
                        <div className="content-title">목표 달성률</div>
                        <div className="min-w-24">
                            {promiseGoal.promiseGoal.endDate
                                ? (
                                    `${(moment(promiseGoal.promiseGoal.endDate) - moment(promiseGoal.promiseGoal.startDate)) / (1000 * 60 * 60 * 24) + 1}일 동안 
                                        ${promiseGoal.promiseGoal.promiseDoneCount && promiseGoal.promiseGoal.promiseDoneCount}회`
                                )
                                : (
                                    `${(moment(new Date().toDateString()) - moment(promiseGoal.promiseGoal.startDate)) / (1000 * 60 * 60 * 24) + 1}일 중 
                                        ${doneCount}번 DONE`
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
            <div className="btn-col w-full mb-0 items-center">
                <div className="done-btn w-full">
                    {!isDoneClicked &&
                        <button className={"btn-main"} onClick={doneClickHanlder}>DONE</button>}
                    {!isSuperDoneClicked && isDoneClicked &&
                        <button className={`btn-special ${isDoneClicked ? 'btn-show' : ''} popup-animation delay-100`}
                                onClick={superDoneClickHanlder}>
                            SUPER DONE</button>}
                    {isSuperDoneClicked &&
                        <button
                            className={`btn-finish ${isSuperDoneClicked ? 'btn-show' : ''} popup-animation delay-100 cursor-auto`}>
                            CLEAR 🔥🔥</button>}
                </div>
                <div>
                    <button className="btn-extra mt-0 p-0 w-fit" onClick={resetGoalBtnHandler}>목표 <span
                        className="text-gray-300 line-through">포기</span> 다음에 다시 도전하기
                    </button>
                </div>
            </div>

        </div>
    )
        ;
}

export default MyPromiseGoal;
