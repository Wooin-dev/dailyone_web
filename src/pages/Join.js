import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_USERS_JOIN} from "../constants/ApiEndpoint";

function Join() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");

    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [passwordConfirmErrorMsg, setPasswordConfirmErrorMsg] = useState("");
    const [nicknameErrorMsg, setNicknameErrorMsg] = useState("");

    const [isValidatedEmail, setIsValidatedEmail] = useState(false);
    const [isValidatedPassword, setIsValidatedPassword] = useState(false);
    const [isValidatedPasswordConfirm, setIsValidatedPasswordConfirm] = useState(false);
    const [isValidatedNickname, setIsValidatedNickname] = useState(false);

    function validateEmail(email) {
        setEmail(email);
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            setEmailErrorMsg("이메일 형식에 맞게 입력해주세요");
            setIsValidatedEmail(false);
        } else {
            setEmailErrorMsg("");
            setIsValidatedEmail(true);
        }
    }

    function validatePassword(password) {
        setPassword(password);
        var passwordLength = password.length;
        if (passwordLength < 8) {
            setPasswordErrorMsg("8자리 이상의 비밀번호를 입력해주세요");
            setIsValidatedPassword(false);
        } else {
            setPasswordErrorMsg("");
            setIsValidatedPassword(true);
        }
    }

    function validatePasswordConfirm(passwordConfirm) {
        setPasswordConfirm(passwordConfirm);
        if (password !== passwordConfirm) {
            setPasswordConfirmErrorMsg("비밀번호가 일치하지 않습니다")
            setIsValidatedPasswordConfirm(false);
        } else {
            setPasswordConfirmErrorMsg("")
            setIsValidatedPasswordConfirm(true);
        }

    }

    function validateNickname(nickname) {
        setNickname(nickname);
        var nicknameLength = nickname.length;
        if (nicknameLength < 3 || nicknameLength > 15) {
            setNicknameErrorMsg("3자리 이상, 15자리 이하의 닉네임을 입력해주세요");
            setIsValidatedNickname(false);
        } else {
            setNicknameErrorMsg("");
            setIsValidatedNickname(true);
        }
    }

    function validateJoin() {
        return isValidatedEmail && isValidatedPassword && isValidatedPasswordConfirm && isValidatedNickname;
    }

    function signupSubmit(_email, _password, _nickname) {
        // console.log(`email : ${email}, password: ${password}, nickname:${nickname}`)
        if (!validateJoin()) {
            alert("형식에 맞게 입력해주세요");
            return false;
        }

        axios.post(`${API_USERS_JOIN}`, {
            email: _email,
            password: _password,
            nickname: _nickname
        }).then(res => {
            console.log(res.data);
            alert("회원가입에 성공했습니다.");
            navigate('/login');
        }).catch(error => {
            console.log(error);
            alert("회원가입에 실패했습니다.");
        });
    }

    return (
        <div className={"size-full"}>

            <h1 className={"text-center my-10"}>JOIN</h1>

            <div className="flex flex-col items-center w-full px-16">
                <div className="input-wrap">
                    <div className="input-title"> 이메일 주소</div>
                    <input name={"email"} value={email} type={"email"} placeholder="로그인에 사용될 이메일 계정입니다"
                           onChange={e => {
                               validateEmail(e.target.value);
                    }}/>
                    <div className="error-msg">{emailErrorMsg}</div>
                </div>
                <div className="input-wrap">
                    <div className="input-title"> 비밀번호</div>
                    <input name={"password"} value={password} type={"password"} placeholder="8자리 이상의 비밀번호"
                           onChange={e => {
                               validatePassword(e.target.value)
                    }}/>
                    <div className="error-msg">{passwordErrorMsg}</div>
                </div>
                <div className="input-wrap">
                    <div className="input-title"> 비밀번호 확인</div>
                    <input name={"password"} value={passwordConfirm} type={"password"} placeholder="8자리 이상의 비밀번호"
                           onChange={e => {
                               validatePasswordConfirm(e.target.value)
                           }}/>
                    <div className="error-msg">{passwordConfirmErrorMsg}</div>
                </div>
                <div className="input-wrap">
                    <div className="input-title"> 닉네임</div>
                    <input name={"nickname"} value={nickname} type={"text"} placeholder="3자리 이상, 15자리 이하"
                           onChange={e => {
                               validateNickname(e.target.value)
                    }}/>
                    <div className="error-msg">{nicknameErrorMsg}</div>
                </div>
                <button className="btn-main my-12" value={"회원가입"} onClick={e => {
                    e.preventDefault();
                    signupSubmit(email, password, nickname);
                }}>회원가입
                </button>
            </div>
        </div>
    );
}

export default Join;