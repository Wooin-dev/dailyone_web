import React, {useEffect, useState} from 'react';
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "../../recoil/loginState";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_PROMISE_GOALS_MY} from "../../constants/ApiEndpoint";
import LoadingPage from "../loading/LoadingPage";
import MyPromiseGoalList from "./MyPromiseGoalList";
import NoGoal from "./createmygoal/NoGoal";

const Done = () => {
    const isLogin = useRecoilValue(isLoginSelector);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isGoalReset, setIsGoalReset] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [myPromiseGoalList, setMyPromiseGoalList] = useState(null);

    useEffect(() => {
        if (!isLogin) {
            navigate("/start");
        } else {
            getMyPromiseGoal();
        }
    }, [isCreated, isGoalReset]);

    // useEffect(() => {
    //     alert(myPromiseGoalList.length);
    // }, [myPromiseGoalList]);

    const getMyPromiseGoal = () => {
        axios.get(`${API_PROMISE_GOALS_MY}`,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(res => {
            setMyPromiseGoalList(res.data.result.myPromiseGoalResponseList);
            console.log(res.data.result.myPromiseGoalResponseList);
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
                myPromiseGoalList && myPromiseGoalList.length !== 0
                    ? <MyPromiseGoalList promiseGoalList={myPromiseGoalList} />
                    : <NoGoal />
                    // <CreateMyGoal isCreated={isCreated} setIsCreated={setIsCreated}/>

            }
        </div>
    );
}

export default Done;