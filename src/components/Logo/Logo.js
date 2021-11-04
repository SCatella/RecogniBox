import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import logo from './face_detect.png'


const Logo = () => {
    return (
        <div className="pa3">
        <Tilt
            className="parallax-effect br2 link pointer"
            perspective={500}
            tiltMaxAngleX={25}
            tiltMaxAngleY={25}
            transitionSpeed={2000}
        >
        <img alt='' src={logo} className="inner-element"/>
        </Tilt>
        </div>
    );
}

export default Logo
