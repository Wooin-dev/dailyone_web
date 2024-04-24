export const getPassedDays = (dt) => {
    const date = new Date(dt)
        date.setHours(0,0,0,0);
    const todayDate = new Date()
        todayDate.setHours(0,0,0,0);

    const passedMSec = todayDate.getTime() - date.getTime();
    const passedDays = passedMSec / 1000 / 60 / 60 / 24;

    return passedDays;
}