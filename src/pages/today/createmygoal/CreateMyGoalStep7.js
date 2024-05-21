import React from 'react';

function CreateMyGoalStep7({value, setValue, limit}) {
    return (
        <div className="size-full flex flex-col justify-center items-center">
                <p className="input-title create-goal">기간동안 몇번 DONE 해볼까요?</p>
                <p>{limit}일 동안 <input className={"w-[3rem]"} value={value}
                          onChange={e => setValue(e.target.value)}/>번 달성하기
                </p>
        </div>
    );
}

export default CreateMyGoalStep7;