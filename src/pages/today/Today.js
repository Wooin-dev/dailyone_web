import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../../recoil/loginState";
import {useNavigate} from "react-router-dom";
import MyGoal from "./MyGoal";
import CreateMyGoal from "./CreateMyGoal";
import axios from "axios";
import {API_GOALS_MY} from "../../constants/ApiEndpoint";

const myGoal = null;

const Today = () => {
    const isLogin = useRecoilValue(isLoginSelector);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            navigate("/start");
        } else {
            getMyGoal();
        }
    }, []);

    const [myGoal, setMyGoal] = useState(null);

    const getMyGoal = () => {
        axios.get(`${API_GOALS_MY}`,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(res => {
            setMyGoal(res.data.result);
            console.log(res.data.result);
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div className="flex flex-col items-center h-full w-full p-8">
            <div className={"flex-grow w-full"}>
            {myGoal != null
                ? <MyGoal goal={myGoal}/>
                : <CreateMyGoal/>
            }
            </div>
        </div>
    );
}

export default Today;