import React from 'react';
import Calendar from "react-calendar";
import moment from "moment";

function CreateMyGoalStep5({value, setValue}) {
    return (
        <div className={`size-full`}>
            <div className="my-10">
                <p className="input-title create-goal">언제부터 시작해볼까요?</p>
                <div className={"w-fit h-[1.6rem] mx-auto flex items-center justify-center space-x-2 mt-3 border-b-[1px]"}>
                    <span className={"w-24"}>{moment(value).format("YYYY. MM. DD")}</span>
                    {/*<FaCalendarAlt className={"fill-gray-600"}/>*/}
                </div>
            </div>
            <div className="w-[90%] mx-auto">
                <Calendar className={"w-fit mx-auto"} onChange={setValue}
                          value={value} minDate={new Date()}
                          formatDay={(locale, date) => moment(date).format('D')}
                          locale={"ko-KR"} calendarType="gregory" // 일요일 부터 시작
                          minDetail={"year"} prev2Label={null} next2Label={null} // +1년 & +10년 이동 버튼 숨기기
                />
            </div>
        </div>
    );
}

export default CreateMyGoalStep5;