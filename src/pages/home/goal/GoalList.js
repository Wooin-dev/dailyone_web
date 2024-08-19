import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {bgColor} from "../../../constants/Temp";
import GoalStatus from "./GoalStatus";
import axios from "axios";
import {API_GOALS_SELECT_THUMBS} from "../../../constants/ApiEndpoint";
import {getPassedTimeBySection} from "../../../util/dateUtil";

function GoalList() {

    const [goalThumbsList, setGoalThumbsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const elementRef = useRef(null);




    // 컴포넌트 렌더링 이후에 실행되며 Intersection Observer를 설정
    useEffect(() => {
        console.log("옵져버 useEffect 실행")

        const onIntersection = (entries) => {
            const firstEntry = entries[0];

            if (firstEntry.isIntersecting && hasMore) {
                // setPage(prevPage => prevPage + 1);
                selectGoalThumbsList();
                console.log(`${page} : 리스트 조회!`)
            }

        }

        const observer = new IntersectionObserver(onIntersection);

        //elementRef가 현재 존재하면 observer로 해당 요소를 관찰
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        // 컴포넌트가 언마운트되거나 더 이상 관찰할 필요가 없을 때(observer를 해제할 때)반환
        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [hasMore, page]);


    const selectGoalThumbsList = async () => {
        console.log(`select실행 : ${page}`)
        if (loading) return; //중복 요청 방지
        setLoading(true);

        const response = await axios.get(`${API_GOALS_SELECT_THUMBS}`, {params: {page: page, size: 10, sort:'createdAt,desc' }});

        const result = response.data.result;

        if (result.goalThumbResponses.length === 0) {
            setHasMore(false);
        } else {
            console.log(page);
            setGoalThumbsList(prevItems => [...prevItems, ...result.goalThumbResponses]);
            setPage((page) => page + 1);
            // console.log(currentPage);
            // console.log(page);
        }
        setLoading(false);

        // axios.get(`${API_GOALS_SELECT_THUMBS}`, {params: {page: page, size: 5}})
        //     .then(res => {
        //
        //         const data = res.data.result;
        //         if (data.goalThumbResponses.length === 0) {
        //             setHasMore(false);
        //         } else {
        //             console.log(data);
        //             setGoalThumbsList(prevItems => [...prevItems, ...data.goalThumbResponses]);
        //             setPage(prevPage => prevPage + 1);
        //             console.log(page);
        //         }
        //     })
        //     .catch(e => console.log(e))
        //     .finally(() => {
        //         setLoading(false);
        //     })
    }


    return (
        <div className="">
            <div className="border-b-[1px]">
                <h2>🔥 이렇게 도전중이에요 </h2>
            </div>
            {goalThumbsList && goalThumbsList.map((thumb, index) => (
                <div key={index}>
                    <GoalThumb goalId={thumb.goalId} author={thumb.nickname} createdAt={thumb.createdAt}
                               simpleGoal={thumb.simpleGoal} originalGoal={thumb.originalGoal}
                               challengersCount={thumb.challengersCount} totalDoneCount={thumb.doneCount}
                               viewCount={thumb.viewCount}
                               bgColor={bgColor[thumb.goalId % bgColor.length]}/>
                </div>
            ))}
            {hasMore &&
                <div ref={elementRef} className="text-center text-gray-700 text-sm py-2"> 다른 목표 불러오는 중...</div>
            }
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
