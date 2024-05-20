import React, {useEffect, useState} from 'react';
import axios from "axios";
import {FaCalendarAlt} from "react-icons/fa";
import {API_GOALS_CREATE} from "../../constants/ApiEndpoint";
import {useNavigate} from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";

function CreateMyGoal({isCreated, setIsCreated}) {

    const navigate = useNavigate();

    const [originalGoal, setOriginalGoal] = useState("");
    const [simpleGoal, setSimpleGoal] = useState("");
    const [motivationComment, setMotivationComment] = useState("");
    const [congratsComment, setCongratsComment] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [promiseDoneCount, setPromiseDoneCount] = useState(0);
    const [promiseDoneCountLimit, setPromiseDoneCountLimit] = useState(0);

    useEffect(() => {
        console.log(showStartCalendar?"true":"false");
    }, [showStartCalendar]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setEndDate(null); // 시작일이 변경되면 종료일을 초기화합니다.
        setShowStartCalendar(!showStartCalendar);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        // 종료일이 변경되면 약속 가능한 최대 횟수를 계산합니다.
        if (startDate && date) {
            const daysBetween = Math.ceil((date - startDate) / (1000 * 60 * 60 * 24));
            setPromiseDoneCountLimit(daysBetween + 1); // 시작일과 종료일을 포함하여 계산
        }
        setShowEndCalendar(!showEndCalendar);
    };


    const createBtnHandler = () => {
        axios.post(`${API_GOALS_CREATE}`,
            {
                originalGoal: originalGoal,
                simpleGoal: simpleGoal,
                motivationComment: motivationComment,
                congratsComment: congratsComment,
                startDate: startDate,
                endDate: endDate,
                promiseDoneCount: promiseDoneCount
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            },
        )
            .then((res) => {
                console.log('success');
                setIsCreated(!isCreated);
            })
            .catch((error) => {
                console.log(error);
                navigate("/")
            });
    }

    return (
        <div className="container">
            <div className={"input-wrap"}>
                <p className={"input-title"}>마음 속 목표를 알려주실래요?</p>
                <input className={""} value={originalGoal} onChange={e => setOriginalGoal(e.target.value)}/>
            </div>
            <div className={"input-wrap"}>
                <p className={"input-title"}>좀 더 쉬운 목표로 잡아볼까요?</p>
                <input className={""} value={simpleGoal} onChange={e => setSimpleGoal(e.target.value)}/>
            </div>
            <div className={"input-wrap"}>
                <p className={"input-title"}>본인에게 동기부여 한다면 어떤말을 할까요?</p>
                <input className={""} value={motivationComment} onChange={e => setMotivationComment(e.target.value)}/>
            </div>
            <div className={"input-wrap"}>
                <p className={"input-title"}>목표달성시, 본인에게 축하의 한마디 한다면?</p>
                <input className={""} value={congratsComment} onChange={e => setCongratsComment(e.target.value)}/>
            </div>
            <div className="input-wrap relative" >
                <p className="input-title">시작일</p>
                <div className={"w-fit h-[1.6rem] z-10 flex items-center space-x-2 mt-3 border-b-[1px]"} onClick={() => {setShowStartCalendar(!showStartCalendar); setShowEndCalendar(false)}}>
                    <span className={"w-24"}>{moment(startDate).format("YYYY. MM. DD")}</span>
                    <FaCalendarAlt className={"fill-gray-600"}/>
                </div>
                {showStartCalendar &&
                    <Calendar className={"w-fit mt-2 absolute top-[4rem]"} onChange={handleStartDateChange} value={startDate} minDate={new Date()}
                              formatDay={(locale, date) => moment(date).format('D')}
                              locale={"ko-KR"} calendarType="gregory" // 일요일 부터 시작
                              minDetail={"year"} prev2Label={null} next2Label={null} // +1년 & +10년 이동 버튼 숨기기

                    />
                }
            </div>
            <div className="input-wrap">
                <p className="input-title">종료일</p>
                <div className={"w-fit h-[1.6rem] flex items-center space-x-2 mt-3 border-b-[1px]"} onClick={() => setShowEndCalendar(!showEndCalendar)}>
                    <span className={"w-24"}>{endDate
                                ? moment(endDate).format("YYYY. MM. DD")
                                : <span className={"text-gray-400"}>{moment(startDate).format("YYYY. MM. DD")}</span>}</span>
                    <FaCalendarAlt className={"fill-gray-600"}/>
                </div>
                {showEndCalendar &&
                    <Calendar className={"mt-2"} onChange={handleEndDateChange} value={endDate} minDate={new Date(new Date(startDate).setDate(startDate.getDate() +1))}
                              formatDay={(locale, date) => moment(date).format('D')}
                              locale={"ko-KR"} calendarType="gregory" // 일요일 부터 시작
                              minDetail={"year"} prev2Label={null} next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                    />
                }
            </div>
            <div className="input-wrap">
                <p className="input-title">목표달성 횟수</p>
                <p><input className={"w-[3rem]"} value={promiseDoneCount} onChange={e => setPromiseDoneCount(e.target.value)}/> / {promiseDoneCountLimit > 0 && promiseDoneCountLimit}</p>
            </div>
            <button className={"btn-main mt-10"} onClick={() => createBtnHandler()}>이게 내 목표야</button>
        </div>
    );
}

export default CreateMyGoal;
