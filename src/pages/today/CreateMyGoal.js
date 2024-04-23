import React, {useState} from 'react';
import axios from "axios";
import {API_GOALS_CREATE} from "../../constants/ApiEndpoint";

function CreateMyGoal() {

    const [originalGoal, setOriginalGoal] = useState("");
    const [simpleGoal, setSimpleGoal] = useState("");
    const [motivationComment, setMotivationComment] = useState("");
    const [congratsComment, setCongratsComment] = useState("");


    const createBtnHandler = () => {
        axios.post(`${API_GOALS_CREATE}`,
            {
                originalGoal: originalGoal,
                simpleGoal: simpleGoal,
                motivationComment: motivationComment,
                congratsComment: congratsComment
            },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            },
        )
            .then((res) => {
                alert(res.data.result);
                console.log('success');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="create-my-goal">
            <div className={"input-wrap"}>
                <p className={"input-title"}>마음 속 목표를 알려주실래요?</p>
                <input className={""} value={originalGoal} onChange={e=> setOriginalGoal(e.target.value)}/>
            </div>
            <div className={"input-wrap"}>
                <p className={"input-title"}>좀 더 쉬운 목표로 잡아볼까요?</p>
                <input className={""} value={simpleGoal} onChange={e=> setSimpleGoal(e.target.value)}/>
            </div>
            <div className={"input-wrap"}>
                <p className={"input-title"}>본인에게 동기부여 한다면 어떤말을 할까요?</p>
                <input className={""} value={motivationComment} onChange={e=> setMotivationComment(e.target.value)}/>
            </div>
            <div className={"input-wrap"}>
                <p className={"input-title"}>목표달성시, 본인에게 축하의 한마디 한다면?</p>
                <input className={""} value={congratsComment} onChange={e=> setCongratsComment(e.target.value)}/>
            </div>
            <button className={"btn-main"} onClick={() => createBtnHandler()}>이게 내 목표야</button>
        </div>
    );
}

export default CreateMyGoal;
