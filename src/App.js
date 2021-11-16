import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js';
import Signin from './components/Signin/Signin.js'
import Register from './components/Register/Register.js'
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground.js';
import './App.css';


const app = new Clarifai.App({
 apiKey: 'c5d2fa0b6264485fb6200a4bc1fea31b'
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
		}
	}

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
            leftCol: clarifaiFace.left_col * width,
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box })
    }

	onInputChange = (event) => {
			this.setState({input: event.target.value});
	}

	onSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input,
        )
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
	}

    onRouteChange = (route) => {
        if(route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({ route: route });
    }

    render() {
        const { isSignedIn, route, box, imageUrl } = this.state;
	  	return (
		<div className="App">
			<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            <ParticlesBackground />
            { route === 'home'
                ? <div>
                    <Logo />
        			<Rank />
        			<ImageLinkForm
        				onInputChange={this.onInputChange}
        				onSubmit={this.onSubmit}
        			/>
                    <FaceRecognition box={box} imageUrl={imageUrl} />
                </div>
                : (
                    route === 'signin'
                    ? <Signin onRouteChange={this.onRouteChange} />
                    : <Register onRouteChange={this.onRouteChange} />
                )
            }
		</div>
		);
	}
}

export default App;
