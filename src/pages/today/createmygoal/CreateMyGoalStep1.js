import React from 'react';

function CreateMyGoalStep1({value, setValue}) {
    return (
        <div className={"size-full flex flex-col items-center justify-center"}>
            <div className="w-4/5 h-24">
                <p className={"input-title create-goal"}>마음 속 목표를 알려주실래요?</p>
                <input value={value} onChange={e => setValue(e.target.value)}/>
            </div>
        </div>
    );
}

export default CreateMyGoalStep1;