import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {isLoginSelector, UserTokenAtom} from "../recoil/loginState";
import {activeMenuKey} from "../recoil/activeKeyMenuBtn";

/**
 * 랜딩페이지 역할.
 * ('/')루트로 접근시 이 페이지로 오며, 로그인이 되었다면 D'ONE페이지로 이동시킨다.
 */
const Start = recoilState => {
    const navigate = useNavigate();
    const isLogin = useRecoilValue(isLoginSelector);
    const [userInfo, setUserInfo] = useRecoilState(UserTokenAtom);
    const setActiveKey = useSetRecoilState(activeMenuKey);
    const getUserFromToken = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            setUserInfo(token);
        }
    };


    useEffect(() => {
        getUserFromToken();
        if (isLogin) {
            console.log("login");
            navigate("/home");
            setActiveKey(1); //홈버튼의 key 인덱스
        }
    }, [isLogin]);

    return (!isLogin &&
        <div className="flex flex-col grow justify-center items-center h-full">
            <h1 className="text-3xl font-bold">
                <p>꾸준한 목표가</p>
                <p>대단한 목표다</p>
            </h1>

            <h2 className={"h-24 mb-12"}>
                <p>한번에 푸시업 30개 하는 것보다 어려운 건</p>
                <p>30일동안 하루에 푸시업 한개씩 하는 것</p>
            </h2>

            <div>
                <button className={"btn-main"} onClick={() => navigate("/login")}>목표설정하러가기</button>
            </div>
        </div>
    );
}

export default Start;
