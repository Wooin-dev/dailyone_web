import React from 'react';

function MyGoal({goal}) {

    return (
        <div>
            <div className={"my-goal"}>
                {goal.originalGoal}
            </div>
            <button className={"btn-main"}>DONE!!</button>
        </div>
    );
}

export default MyGoal;
