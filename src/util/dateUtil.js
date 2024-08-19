export const getPassedDays = (dt) => {
    const date = new Date(dt)
        date.setHours(0,0,0,0);
    const todayDate = new Date()
        todayDate.setHours(0,0,0,0);

    const passedMSec = todayDate.getTime() - date.getTime();
    const passedDays = passedMSec / 1000 / 60 / 60 / 24;

    return passedDays;
}


export const getPassedTimeBySection = (dateString) => {

    const timeUnits = [
        { unit: "년", value: 1000 * 60 * 60 * 24 * 365 },
        { unit: "개월", value: 1000 * 60 * 60 * 24 * 30 },
        { unit: "일", value: 1000 * 60 * 60 * 24 },
        { unit: "시간", value: 1000 * 60 * 60 },
        { unit: "분", value: 1000 * 60 },
        { unit: "초", value: 1000 },
    ];

    const now = new Date();
    const pastDate = new Date(dateString);
    const diff = now - pastDate; // Difference in milliseconds

    //7일보다 오래된 경우 날짜로 포맷함
    const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    if (diff > sevenDaysInMilliseconds) {
        return formatDate(pastDate);
    }

    //그렇지 않으면, 단위를 찾아 리턴
    for (let i = 0; i < timeUnits.length; i++) {
        const diffInUnits = Math.floor(diff / timeUnits[i].value);
        if (diffInUnits > 0) {
            return `${diffInUnits}${timeUnits[i].unit} 전`;
        }
    }
    return "방금 전";
}

const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(2); // Get last two digits of the year
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with zero if needed
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with zero if needed
    return `${year}.${month}.${day}`;
};
