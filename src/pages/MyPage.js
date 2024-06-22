import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_USERS_MYINFO} from "../constants/ApiEndpoint";
import {IoPersonCircleSharp} from "react-icons/io5";
import {BiSolidPencil} from "react-icons/bi";
import {AiOutlineRollback} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {UserTokenAtom} from "../recoil/loginState";


function MyPage(props) {
    const navigate = useNavigate();

    const [myInfo, setMyInfo] = useState({});
    const getMyInfo = () => {
        axios.get(`${API_USERS_MYINFO}`,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            })
            .then(res => {
                setMyInfo(res.data.result);
                console.log(res.data.result);
            }).catch(e => {
            console.log(e);
        })
    }
    useEffect(() => {
        getMyInfo();
    }, []);

    //로그아웃버튼 기능
    const setUserTokenAtom = useSetRecoilState(UserTokenAtom);
    const logoutBtnOnClickHandler = () => {
        setUserTokenAtom(undefined);
        localStorage.removeItem('token');
        navigate("/");
    }

    //수정버튼 기능
    const [editMode, setEditMode] = useState(false);
    const editBtnOnClickHandler = () => {
        setEditMode(true);
    }
    const [newNickname, setNewNickname] = useState("");
    useEffect(() => {
        setNewNickname(myInfo.nickname)
    }, [myInfo]);
    const editConfirmBtnHandler = () => {
        //TODO 최종확인창 추가
        axios.put(`${API_USERS_MYINFO}`,
            {
                "nickname": newNickname
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(res => {
            console.log(res);
            setEditMode(false);
            myInfo.nickname = newNickname;
            //TODO 수정성공 메시지 toast 추가
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className="w-full h-full flex flex-col p-4">
            <div className={"mypage-profile relative mx-10"}>
                <div><IoPersonCircleSharp className={"size-20 fill-gray-400"}/></div>
                <div className="text-2xl font-bold h-10">
                    {!editMode
                        ? <div className="h-10 pt-[3.5px] pb-[10px]">{myInfo.nickname}</div>
                        : <div className={"flex relative items-center justify-center w-[21rem]"}>
                            <input value={newNickname} onChange={e => setNewNickname(e.target.value)}
                                   className={"text-center w-[12rem] h-10"}/>
                            <div
                                className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 px-1 cursor-pointer fill-green-800 bg-gray-200 rounded"
                                onClick={editConfirmBtnHandler}>
                                {/*<FaCheck className={""}/>*/}
                                <span className="text-lg text-gray-600 align-text-top">수정</span>
                            </div>
                        </div>
                    }
                </div>
                <div className="size-6 m-2 absolute top-0 right-0 cursor-pointer">
                    {!editMode
                        ? <BiSolidPencil className={"fill-gray-400 size-6"} onClick={()=>setEditMode(true)}/>
                        : <AiOutlineRollback className={"fill-gray-400 size-6"} onClick={()=>setEditMode(false)}/>
                    }
                </div>
            </div>
            <div className={"flex-grow mx-10"}>
                {myInfo.kakaoId === null ?
                <div className="content-wrap">
                    <p className={"content-title"}>이메일</p>
                    <div>{ myInfo.email}</div>
                </div>
                    : <div className="w-full mb-3 text-center text-sm text-gray-600">카카오 로그인 계정</div>
                }
                <div className={"content-wrap"}>
                    <p className={"content-title"}>회원가입일</p>
                    <div>{myInfo.createdAt && (myInfo.createdAt).slice(0, 10)}</div>
                </div>
            </div>

            <button className="btn-extra" onClick={logoutBtnOnClickHandler}>로그아웃</button>

        </div>
    );
}

export default MyPage;
