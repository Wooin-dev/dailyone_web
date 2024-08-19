import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {API_GOALS_GENERATE_SIMPLE} from "../../constants/ApiEndpoint";

function CreateMyGoalStep2({value, setValue, originalGoal}) {
    const refInput = useRef(null);
    useEffect(() => {
        refInput.current.focus();
    }, []);

    const [generatedSimpleGoalList, setGeneratedSimpleGoalList] = useState([]);

    useEffect(() => {
        axiosGetGeneratedSimpleGoalList();
    }, [originalGoal]);
    const axiosGetGeneratedSimpleGoalList = () => {
        axios.get(`${API_GOALS_GENERATE_SIMPLE}`,
            {
                params: {
                    originalGoal: originalGoal
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }
            }).then(res => {
            console.log(res.data.result.generatedSimpleGoalList);
            setGeneratedSimpleGoalList(res.data.result.generatedSimpleGoalList);
        }).catch(e => {
            console.log(e);
        })
    }

    return (
        <div className="size-full flex flex-col items-center justify-center">
            <div className="w-4/5">
                <p className={"input-title create-goal"}>좀 더 쉬운 목표로 잡아볼까요?</p>
                <input ref={refInput} value={value} onChange={e => setValue(e.target.value)}/>
                <div className={"w-3/4 mt-3"}>
                    {generatedSimpleGoalList && generatedSimpleGoalList.map((goal, index)=> (
                        <div className={"w-fit px-3.5 py-1 mb-2 text-gray-700 bg-[#caf1f5] rounded-full cursor-pointer"}
                             onClick={e => setValue(e.target.textContent)} key={index}>
                            {goal}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default CreateMyGoalStep2;
