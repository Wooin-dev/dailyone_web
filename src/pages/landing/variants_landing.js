export const firstSlide = {
    initial: {
        x: "0%",
        scale: 0.5,
        opacity: 0
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5 // 애니메이션 지속 시간
        }
    },
    exit: {
        x: "-100%", // 왼쪽으로 이동하여 사라짐
        opacity: 0,
        transition: {
            duration: 0.5 // 애니메이션 지속 시간
        }
    }
};

export const middleSlide = {
    initial: {
        scale: 0.5,
        opacity: 0
    },
    animate: {
        x:0,
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5 // 애니메이션 지속 시간
        }
    },
    exit: (back) => ({
        x: back ? "100%" : "-100%",
        opacity: 0,
        scale: 0.5,
        transition: {
            duration: 0.5 // 애니메이션 지속 시간
        }
    })
};
