import React, {useEffect, useState} from 'react';
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../../recoil/loginState";
import {useNavigate} from "react-router-dom";
import MyGoal from "./MyGoal";
import CreateMyGoal from "./createmygoal/CreateMyGoal";
import axios from "axios";
import {API_PROMISE_GOALS_MY} from "../../constants/ApiEndpoint";
import LoadingPage from "../loading/LoadingPage";

const myGoal = null;

const Today = () => {
    const isLogin = useRecoilValue(isLoginSelector);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isGoalReset, setIsGoalReset] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [myPromiseGoal, setMyPromiseGoal] = useState(null);

    useEffect(() => {
        if (!isLogin) {
            navigate("/start");
        } else {
            getMyPromiseGoal();
        }
    }, [isCreated, isGoalReset]);

    const getMyPromiseGoal = () => {
        axios.get(`${API_PROMISE_GOALS_MY}`,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(res => {
            setMyPromiseGoal(res.data.result);
            console.log(res.data.result);
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div className="size-full">
            {/*{isCreated}{isGoalReset}*/}
            {isLoading ? <LoadingPage/> :
                myPromiseGoal != null
                    ? <MyGoal promiseGoal={myPromiseGoal} setMyPromiseGoal={setMyPromiseGoal}/>
                    : <CreateMyGoal isCreated={isCreated} setIsCreated={setIsCreated}/>

            }
        </div>
    );
}

export default Today;