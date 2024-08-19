import React, {useEffect} from 'react';
import GoalList from "./goal/GoalList";
import {useSetRecoilState} from "recoil";
import {activeMenuKey} from "../../recoil/activeKeyMenuBtn";

function Home(props) {

    const setActiveKey = useSetRecoilState(activeMenuKey);

    useEffect(() => {
        setActiveKey(1);
    }, []);

    return (
        <div className="size-full py-5">
            <GoalList />
            <div>
            </div>
        </div>
    );
}
export default Home;
