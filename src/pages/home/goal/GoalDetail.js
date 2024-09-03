import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    API_GOALS_FEED_LIST,
    API_GOALS_FOLLOW,
    API_GOALS_SELECT,
    API_PROMISE_GOALS_CHECK_EXIST
} from "../../../constants/ApiEndpoint";
import {bgColor} from "../../../constants/Temp";
import {GrGroup} from "react-icons/gr";
import {FaRegCircleCheck} from "react-icons/fa6";
import axios from "axios";
import {IoArrowBack} from "react-icons/io5";
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../../../recoil/loginState";
import {getPassedTimeBySection} from "../../../util/dateUtil";

function GoalDetail(props) {
    const navigate = useNavigate();
    const {id} = useParams(); // URL 파라미터 가져오기
    const isLogin = useRecoilValue(isLoginSelector);
    const [goal, setGoal] = useState(null);
    const [isPromised, setIsPromised] = useState(false);
    const [feedList, setFeedList] = useState();

    const avgDone = 0.3;
    const author = goal && goal.nickname;

    useEffect(() => {
        fetchGoal();
        feedListAxios();
    }, [id]);

    useEffect(() => {
        if (isLogin) checkIsPromised();
    }, [isLogin]);


    const fetchGoal = async () => {
        const response = await fetch(`${API_GOALS_SELECT}/${id}`);
        const data = await response.json();
        setGoal(data.result);
    };

    const checkIsPromised = () => {
        axios.get(`${API_PROMISE_GOALS_CHECK_EXIST}/${id}`, {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
        })
            .then(res => {
                setIsPromised(res.data.result);
            })
            .catch(e => console.log(e));
    };


    const challengeGoalBtnHandler = () => {
        // 로그인 상태 체크
        if (!isLogin) {
            alert("로그인이 필요한 기능입니다");
            return;
        }
        if (!window.confirm("자신의 목표로 설정하시겠습니까?")) return;
        followGoalAxios();
    }

    const followGoalAxios = () => {
        axios.post(`${API_GOALS_FOLLOW}`,
            {
                goalId: id,
                startDate: new Date()
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            },
        )
            .then((res) => {
                console.log('success');
                alert("목표를 생성했습니다");
                // setIsCreated(!isCreated);
                navigate("/done");
            })
            .catch((error) => {
                console.log(error);
                alert("목표 생성에 실패했어요😭");
            });
    }

    const feedListAxios = () => {

        axios.get(`${API_GOALS_FEED_LIST}`,
            {
                params: {
                    goalId: id,
                    page: 0,
                    size: 10
                },
            }).then(res => {
            console.log(res.data.result);
            setFeedList(res.data.result.feedOfGoalList);
        })
            .catch(e => console.log(e));
    }

    const feedArgsCombineWithText = (feedArgs, feedText) => {
        // 정규 표현식을 사용하여 {} 안의 변수를 찾음
        return feedText.replace(/{(.*?)}/g, (match, p1) => {
            // p1은 {} 안의 변수명
            return feedArgs[p1] || match; // args에서 변수명을 찾아서 대체, 없으면 원래의 match 반환
        });
    }

    return goal && (
        <div className="size-full relative">
            <div className="px-5 mb-3">
                <div className="flex justify-between items-center py-5">
                    <div className="flex items-center">
                        <IoArrowBack className="mr-1 size-5 text-gray-600 cursor-pointer" onClick={() => navigate(-1)}/>
                        <div
                            className={`mr-2 flex items-center justify-center ${bgColor[goal.goalId % bgColor.length]} size-8 text-center rounded-full`}>
                            {author.substring(0, 1)}
                        </div>
                        <div className="text-sm font-semibold text-gray-800 mr-1">{author}</div>
                        <div className="text-[0.8rem] text-gray-400">{getPassedTimeBySection(goal.createdAt)}</div>
                    </div>
                    {isPromised
                        ? (
                            <div
                                className="py-1.5 px-3 rounded-full text-center text-sm text-white bg-gray-300 font-semibold cursor-default">
                                도전 중
                            </div>
                        ) : (
                            <div
                                className="py-1.5 px-3 rounded-full text-center text-sm text-white bg-[#0bb8bc] font-semibold cursor-pointer"
                                onClick={challengeGoalBtnHandler}>
                                목표 도전
                            </div>
                        )
                    }

                </div>
                <div className={"flex flex-col items-center py-1 mb-5"}>
                    <div className="text-xl font-semibold mb-5">
                        {goal.simpleGoal}
                    </div>
                    <div>
                        <div className="w-fit py-0 px-1.5 mx-auto bg-gray-100
                        text-gray-500 font-bold rounded-full text-[0.55rem]">
                            SUPER-DONE
                        </div>
                        <div className="text-lg text-center">
                            {goal.originalGoal}
                        </div>
                    </div>
                </div>
                <div className="py-3 border-y-[0.5px]">
                    <div className="flex justify-around text-sm">
                        <div className="flex items-center gap-x-1">
                            <GrGroup/>{goal.challengersCount}명 도전중
                        </div>
                        <div className="flex items-center gap-x-1"><FaRegCircleCheck className="py-[1px]"/>
                            {goal.doneCount}번의 DONE
                        </div>
                    </div>
                </div>
                <div>
                    {feedList && feedList.map((feed, index) => (
                        <div key={index} className="px-2 py-3 my-1 border-b-[0.2px] text-sm  shadow-sm">

                            <div className="flex justify-between items-center">
                                <p>{feedArgsCombineWithText(feed.feedArgs, feed.feedText)}</p>
                                <div className="text-sm text-gray-700">{getPassedTimeBySection(feed.createdAt)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*<div className="">*/}
            {/*    목표에 달린 done리스트*/}
            {/*</div>*/}
        </div>
    )
        ;
}

export default GoalDetail;
