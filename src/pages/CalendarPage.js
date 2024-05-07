import React, {useEffect, useState} from 'react';
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";
import {API_DONE_DATE, API_GOALS_MY} from "../constants/ApiEndpoint";

const attendDay = ["2024-05-05", "2024-05-08"];

function CalendarPage(props) {

    const [date, setDate] = useState(new Date());

    const [doneOfDate, setDoneOfDate] = useState([{}]);

    useEffect(() => {
        if (date != null) {
            getDoneOfDate();
        }
    }, [date]);

    const getDoneOfDate = () => {
        if (date == null) {
            return;
        }
        setDoneOfDate(null);
        axios.get(`${API_DONE_DATE}`,
            {
                params: {
                    createdAt: date
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(res => {
            setDoneOfDate(res.data.result.doneList);
            console.log(res.data.result);
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div className={"size-full p-5 bg-gray-50"}>
            <div className="cal-container">
                <Calendar onChange={setDate}
                          value={date}
                          calendarType="gregory" // 일요일 부터 시작
                          locale={"ko-KR"}
                    // activeStartDate={new Date(2024, 4, 3)}
                          formatDay={(locale, date) => moment(date).format('D')}
                          formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
                          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
                          minDetail={"year"}
                          minDate={new Date(2024, 4, 5)} //TODO : 목표의 시작날
                    // maxDate={new Date(2024,5,3)} TODO : 목표 설정 마감일시 연동하기
                          showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
                          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
                    // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
                          tileContent={({date, view}) => {
                              let html = [];
                              // if (
                              //     view === "month" &&
                              //     date.getMonth() === today.getMonth() &&
                              //     date.getDate() === today.getDate()
                              // ) {
                              //     html.push(<div key={"today"} className={"cal-today"}>오늘</div>);
                              // }
                              if (
                                  attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))
                              ) {
                                  html.push(<div className={"cal-done-dot"}/>);
                              }
                              return <>{html}</>;
                          }}
                />
            </div>
            <div className={"bg-white shadow-md p-3 h-[10rem]"}>
                <div className={"w-fit mx-auto mb-5 font-bold"}>
                    {moment(date).format("YYYY.MM.DD")}
                </div>
                <div className={"px-3"}>
                    {doneOfDate && doneOfDate.map((done) => (
                        <div key={done.doneId} className={"flex justify-between items-center mb-1.5"}>
                            <div>{moment(done.createdAt).format("HH:mm")} {done.goalDto && done.goalDto.simpleGoal} </div>
                            <div className={"bg-[#0bb8bc] p-2 py-1 rounded-full font-bold text-sm text-white"}>DONE!
                            </div>
                        </div>
                    ))}
                    {/*{moment(pickedDayDone.createdAt).format("hh:mm")}*/}
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;
