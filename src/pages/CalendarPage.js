import React, {useEffect, useState} from 'react';
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";
import {API_DONE_DATE, API_DONE_MONTH} from "../constants/ApiEndpoint";


function CalendarPage(props) {

    const [date, setDate] = useState(new Date());
    const [doneOfDate, setDoneOfDate] = useState([{}]);
    const [yearMonth, setYearMonth] = useState(moment(date).format("YYYY-MM"));
    const [doneOfMonth, setDoneOfMonth] = useState([""]);

    useEffect(() => {
        //해당 날짜의 DoneDetail 가져오기 axios
        if (date != null) {
            getDoneOfDate();
        }
    }, [date]);

    useEffect(() => {
        getDoneOfMonth();
    }, [yearMonth]);

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

    const onActiveStartDateChangeHandler = (activeStartDate) => {
        let pickedYearMonth = moment(activeStartDate).format("YYYY-MM");
        if (yearMonth !== pickedYearMonth) {
            setYearMonth(pickedYearMonth);
        }
    }
    const getDoneOfMonth = () => {
        setDoneOfDate(null);
        axios.get(`${API_DONE_MONTH}`,
            {
                params: {
                    yearMonth: yearMonth
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(res => {
            setDoneOfMonth(res.data.result.doneOfMonthArray);
            console.log(res.data.result.doneOfMonthArray);
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
                          //minDate={new Date(2024, 4, 5)} //TODO : 목표의 시작날
                          maxDate={new Date()}
                          showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
                          onActiveStartDateChange={({action, activeStartDate, value, view }
                                                    ) => onActiveStartDateChangeHandler(activeStartDate)}
                          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
                    // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
                          tileContent={({date, view}) => {
                              if (doneOfMonth.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                                  return <div className={"cal-done-dot"}/>;
                              }
                          }}
                />
            </div>
            <div className={"bg-white shadow-md p-3 h-[10rem]"}>
                <div className={"w-fit mx-auto mb-5 font-bold text-gray-700"}>
                    {moment(date).format("YYYY.MM.DD")}
                </div>
                <div className={"px-3"}>
                    {doneOfDate && doneOfDate.map((done) => (
                        <div key={done.done && done.done.doneId} className={"flex justify-between items-center mb-1.5"}>
                            <div>{moment(done.done && done.done.createdAt).format("HH:mm")} {done.goal && done.goal.simpleGoal} </div>
                            <div className={"bg-[#0bb8bc] p-2 py-1 rounded-full font-bold text-sm text-white"}>DONE!</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;
