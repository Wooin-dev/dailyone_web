import React from 'react';

const LoadingDots = () => {
    return (
        <div className="flex space-x-2">
            <div className="w-2.5 h-2.5 dot rounded-full bounce-y delay-0"></div>
            <div className="w-2.5 h-2.5 dot rounded-full bounce-y delay-100"></div>
            <div className="w-2.5 h-2.5 dot rounded-full bounce-y delay-200"></div>
        </div>
    );
}

export default LoadingDots;
