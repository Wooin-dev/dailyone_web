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

    const [isGoalReset, setIsGoalReset] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [myGoal, setMyGoal] = useState(null);

    useEffect(() => {
        if (!isLogin) {
            navigate("/start");
        } else {
            getMyGoal();
        }
    }, [isCreated, isGoalReset]);

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
        <div className="flex flex-col items-center flex-grow w-full">
                {/*{isCreated}{isGoalReset}*/}
            {myGoal != null
                ? <MyGoal goal={myGoal} setMyGoal={setMyGoal} />
                : <CreateMyGoal isCreated={isCreated} setIsCreated={setIsCreated} />
            }
        </div>
    );
}

export default Today;