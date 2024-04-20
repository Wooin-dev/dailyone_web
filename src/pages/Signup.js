import React from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_USERS_SIGNUP} from "../constants/ApiEndpoint";

function SignUp() {

    const navigate = useNavigate();

    function signupSubmit(_id, _pwd, _email, _nickname) {
        axios.post(`${API_USERS_SIGNUP}`, {
            username: _id,
            password: _pwd,
            email: _email,
            nickname: _nickname
        }).then(res => {
            console.log(res.data);
            navigate('/login');
        }).catch(error => {
            alert(error);
        })
    }

    return (
        <div className={'page-container'}>

            <h1>회원가입</h1>

            <form onSubmit={e => {
                e.preventDefault();

                const id = e.target.id.value;
                const pwd = e.target.pwd.value;
                const email = e.target.email.value;
                const nickname = e.target.nickname.value;

                signupSubmit(id, pwd, email, nickname);
                navigate('/')
            }}>
                <p><input type="text" name="id" placeholder="id"/></p>
                <p><input type="password" name="pwd" placeholder="pwd"/></p>
                <p><input type="text" name="email" placeholder="email"/></p>
                <p><input type="text" name="nickname" placeholder="nickname"/></p>
                <p><input type="submit" value="회원가입"/></p>
            </form>


            <div>
                {/*<br/>*/}
                {/*state status*/}
                {/*<ul>*/}
                {/*    <li> {id} </li>*/}
                {/*    <li> {pwd} </li>*/}
                {/*    <li> {email} </li>*/}
                {/*    <li> {nickname} </li>*/}
                {/*</ul>*/}
            </div>

        </div>
    );
}

export default SignUp;