import React, {useEffect, useRef} from 'react';

function CreateMyGoalStep4({value, setValue}) {
    const refInput = useRef(null);
    useEffect(() => {
        refInput.current.focus();
    }, []);

    return (
        <div className={"size-full flex flex-col items-center justify-center"}>
            <div className="w-4/5 h-24">
                <p className={"input-title create-goal"}>목표달성시, 본인에게 축하의 한마디 한다면?</p>
                <input ref={refInput} value={value} onChange={e => setValue(e.target.value)}/>
            </div>
        </div>
    );
}

export default CreateMyGoalStep4;