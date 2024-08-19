import React from 'react';
import moment from "moment/moment";
import Calendar from "react-calendar";

function CreateMyGoalStep6({value, setValue, startDate}) {
    return (
        <div className={`size-full`}>
            <div className="my-10">
                <p className="input-title create-goal">언제까지 이어가볼까요?</p>
                <div className={"w-fit h-[1.6rem] mx-auto flex items-center justify-center space-x-2 mt-3 border-b-[1px]"}>
                    <span className={"w-24"}>{value
                        ? moment(value).format("YYYY. MM. DD")
                        : <span className={"text-gray-400"}>{moment(startDate).format("YYYY. MM. DD")}</span>}</span>
                    {/*<FaCalendarAlt className={"fill-gray-600"}/>*/}
                </div>
            </div>
            <div className="w-[90%] mx-auto">
                <Calendar className={"w-fit mx-auto"} onChange={setValue} value={value}
                          minDate={new Date(new Date(startDate).setDate(startDate.getDate() + 1))}
                          formatDay={(locale, date) => moment(date).format('D')}
                          locale={"ko-KR"} calendarType="gregory" // 일요일 부터 시작
                          minDetail={"year"} prev2Label={null} next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                />
            </div>
        </div>
    );
}

export default CreateMyGoalStep6;