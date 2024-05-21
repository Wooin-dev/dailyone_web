import React from 'react';

function CreateMyGoalStep2({value, setValue}) {
    return (
        <div className="size-full flex flex-col items-center justify-center">
            <div className="w-4/5 h-24">
                <p className={"input-title create-goal"}>좀 더 쉬운 목표로 잡아볼까요?</p>
                <input value={value} onChange={e => setValue(e.target.value)}/>
            </div>
        </div>
    );
}

export default CreateMyGoalStep2;