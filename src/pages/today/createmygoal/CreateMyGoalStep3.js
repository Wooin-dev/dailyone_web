import React from 'react';

function CreateMyGoalStep3({value, setValue}) {
    return (
        <div className={"size-full flex flex-col items-center justify-center"}>
            <div className="w-4/5 h-24">
                <p className={"input-title create-goal"}>본인에게 동기부여 한다면 어떤말을 할까요?</p>
                <input value={value} onChange={e => setValue(e.target.value)}/>
            </div>
        </div>
    );
}

export default CreateMyGoalStep3;