import React from 'react';
import Particles from "react-tsparticles";
import './ParticlesBackground.css'


const particlesOptions = {
	fpsLimit: 60,
	interactivity: {
          events: {
            onClick: {
              enable: false,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 125,
              duration: 0.4,
            },
          },
        },
	particles: {
		color: {
			value: "#ffffff",
		},
		links: {
			color: "#ffffff",
			distance: 150,
			enable: true,
			opacity: 0.5,
			width: 0.25,
		},
		collisions: {
			enable: false,
		},
		move: {
			direction: "none",
			enable: true,
			outMode: "bounce",
			random: false,
			speed: 1,
			straight: false,
		},
		number: {
			density: {
				enable: true,
				value_area: 800,
			},
			value: 100,
		},
		opacity: {
			value: 0.75,
		},
		shape: {
			type: "circle",
		},
		size: {
			random: true,
			value: 2,
		},
	},
	detectRetina: true,
}


const ParticlesBackground = () => {
    return (
        <div>
			<Particles className='particles'
				id="tsparticles"
				options={particlesOptions}
			/>
        </div>
    );
}

export default ParticlesBackground
