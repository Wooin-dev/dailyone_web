import React from 'react';
import LoadingDots from "./LoadingDots";

const LoadingPage = (props) => {
    return (
        <div className="size-full flex justify-center items-center fade-in">
            <LoadingDots />
        </div>
    );
}

export default LoadingPage;
