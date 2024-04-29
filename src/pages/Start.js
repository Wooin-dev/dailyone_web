import React from 'react';
import {useNavigate} from "react-router-dom";

/**
 * 랜딩페이지 역할.
 * 로그인 되지않았을때, 이곳으로 넘겨진다.
 */
const Start = () => {

    const navigate = useNavigate();
    return (
        <div className="flex flex-col grow justify-center items-center h-full">
            <h1 className="text-3xl font-bold">
                <p>꾸준한 목표가 대단한 목표다</p>
            </h1>

            <h2 className={"h-24 mb-12"}>
                <p>한번에 푸시업 30개 하는 것보다 어려운 건</p>
                <p>30일동안 하루에 푸시업 한개씩 하는 것</p>
            </h2>

            <div>
                <button className={"btn-main"} onClick={() =>navigate("/login")}>목표설정하러가기</button>
            </div>
        </div>
    );
}

export default Start;