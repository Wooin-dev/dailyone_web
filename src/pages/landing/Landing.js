import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import slides from "./Slides";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import Slides1 from "./Slides1";
import {firstSlide, middleSlide} from "./variants_landing";
import Slides2 from "./Slides2";
import 'swiper/css';
import Slides3 from "./Slides3";

const Landing = (props) => {
    const navigate = useNavigate();

    //쿠키설정
    const [cookies, setCookie] = useCookies(['visited']);
    useEffect(() => {
        // 쿠키에 방문 기록이 없다면, 방문 기록을 쿠키에 저장합니다.
        if (!cookies.visited) {
            setCookie('visited', true, {maxAge: 31536000}); // 1년 동안 쿠키 유지
            alert("쿠키저장");
        }
    }, [cookies.visited, setCookie]);


    // 이전 다음버튼
    const [currentSlide, setCurrentSlide] = useState(0);
    const [back, setBack] = useState(false);
    console.log(currentSlide);
    const goToPreviousSlide = () => {
        setBack(true);
        setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 1));
    };
    const goToNextSlide = () => {
        setBack(false);
        setCurrentSlide((prev) =>
            prev === slides.length - 1 ? slides.length - 1 : prev + 1
        );
    };

    //TODO: 랜딩페이지 수정 및 마무리
    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <motion.div
                    className="absolute top-0 right-0"
                    initial="initial"
                    animate={(currentSlide === 0) ? "animate" : "exit"}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                    custom={back}
                    variants={firstSlide}
                >
                    <Slides1/>
                </motion.div>
                <motion.div
                    className="absolute top-0 right-0"
                    initial="initial"
                    animate={(currentSlide === 1) ? "animate" : "exit"}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                    custom={back}
                    variants={middleSlide}
                >
                    <Slides2/>
                </motion.div>
                <motion.div
                    className="absolute top-0 right-0"
                    initial="initial"
                    animate={(currentSlide === 2) ? "animate" : "exit"}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                    custom={back}
                    variants={middleSlide}
                >
                    <Slides3/>
                </motion.div>
            </div>
            <div className="btn-wrap flex space-x-2 relative">
                <button onClick={goToPreviousSlide}>prev</button>
                <button onClick={goToNextSlide}>next</button>
            </div>
        </div>
    )
        ;
}
export default Landing;