import React from 'react';

const ProgressCircle = ({ progressDone, progressSuperDone, size }) => {
    // 원 스트로크의 두께
    const strokeWidth = "10"
    // 원의 반지름
    const radius = size / 2 - Number(strokeWidth);
    // 원의 중심 좌표
    const centerX = size / 2;
    const centerY = size / 2;
    // 원의 둘레를 계산
    const circumference = radius * 2 * Math.PI;
    // 시작 지점을 12시로 설정하기 위한 오프셋
    // const offset = circumference * 0.25;
    // 진행률에 따른 원의 둘레
    const strokeDashoffsetDone = circumference * (progressDone - 1);
    const strokeDashoffsetSuperDone = circumference * (progressSuperDone - 1);


    return (
        <svg className="block" transform={"rotate(-90)"} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
                className="relative top-1/2 fill-none stroke-current text-gray-200"
                cx={centerX}
                cy={centerY}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeLinecap="round" // 둥근 끝 설정
            />
            <circle
                className="fill-none stroke-current text-blue-500 transition-all duration-500"
                cx={centerX}
                cy={centerY}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffsetDone}
                strokeLinecap="round" // 둥근 끝 설정
            />
        </svg>
    );
};

export default ProgressCircle;
