import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {UserTokenAtom} from "../recoil/loginState";
import axios from "axios";
import {API_USERS_LOGIN} from "../constants/ApiEndpoint";
import {KAKAO_AUTH_URL} from "../constants/OAuth";
import SocialKakao from "../component/SocialKakao";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userInfo, setUserInfo] = useRecoilState(UserTokenAtom);

    const navigate = useNavigate();

    // 엔터키 이벤트 핸들러
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            // 엔터 키가 눌렸을 때 실행할 동작
            loginBtnHandler();
        }
    };

    // 로그인 버튼 핸들러
    function loginBtnHandler() {
        if (!loginValidate()) {
            return;
        }
        axios.post(`${API_USERS_LOGIN}`, {
            email: email,
            password: password
        }, {
            withCredentials: true
        }).then(res => {
            const token = res.data.result.token
            setUserInfo(token);
            localStorage.setItem('token', token);
            navigate('/');
        }).catch(error => {
            console.log(error)
            alert("로그인에 실패하였습니다");
        });
    }

    function loginValidate() {
        if (email === "" || password === "") {
            alert("이메일과 비밀번호를 확인해주세요.");
            return false;
        }
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (!regex.test(email)) {
            alert("이메일이 형식에 맞지 않습니다.");
            return false;
        }
        return true;
    }


    function kakaoLogin() {
        axios.get(`${KAKAO_AUTH_URL}`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            withCredentials: true
        }).then(res => {
            const token = res.data.result.token
            setUserInfo(token);
            localStorage.setItem('token', token);
            navigate('/');
        }).catch(error => {
            console.log(error)
            // if(error.response.status === 404) {
            alert("로그인에 실패하였습니다");
            // }
        });
        // e.preventDefault();
        // window.location.href = KAKAO_AUTH_URL;
    }

    // const SocialKakao =()=>{
    //
    //     const kakaoClientId = 'JavaScript KEY'
    //     const kakaoOnSuccess = async (data)=>{
    //         console.log(data)
    //         const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
    //     }
    //     const kakaoOnFailure = (error) => {
    //         console.log(error);
    //     };
    //     return(
    //         <>
    //             <KakaoLogin
    //                 token={kakaoClientId}
    //                 onSuccess={kakaoOnSuccess}
    //                 onFail={kakaoOnFailure}
    //             />
    //         </>
    //     )
    // }

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl font-bold">Login</h1>

            <div className="flex flex-col items-center w-full px-16 my-12"
                 onKeyDown={handleKeyDown}>
                <div className={"input-wrap"}>
                    <div className={"input-title"}>이메일 계정</div>
                    <input name={"id"} value={email} onChange={e => {
                        setEmail(e.target.value);
                    }}/>
                </div>
                <div className={"input-wrap"}>
                    <div className={"input-title"}>비밀번호</div>
                    <input name={"password"} value={password} type={"password"} onChange={e => {
                        setPassword(e.target.value)
                    }}/>
                </div>

                <div className="btn-col mt-10">
                    <button className="btn-main" value={"로그인"} onClick={e => {
                        e.preventDefault();
                        loginBtnHandler();
                    }}>로그인
                    </button>
                    <button className="btn-sub" onClick={e => {
                        navigate('/join');
                    }}>회원가입
                    </button>
                    <SocialKakao/>
                </div>
            </div>
        </div>
    );
}

export default Login;
