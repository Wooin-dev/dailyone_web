import React from 'react';

const LandingSlide = ({ image, text }) => {
    return (
        <div className="landing-slide">
            <img src={image} alt="Slide" />
            <p>{text}</p>
        </div>
    );
};

export default LandingSlide;
