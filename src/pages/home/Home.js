import React from 'react';
import GoalList from "./goal/GoalList";

function Home(props) {
    return (
        <div className="size-full py-5">
            <GoalList />
            <div>
            </div>
        </div>
    );
}
export default Home;
