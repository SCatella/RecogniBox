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
            user: {
                id: '',
                name: '',
                email: '',
                submissions: 0,
                joined: ''
            }
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

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            submissions: data.submissions,
            joined: data.joined
        }})
    }

	onInputChange = (event) => {
			this.setState({input: event.target.value});
	}

	onImageSubmit = () => {
		this.setState({imageUrl: this.state.input});
		app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input,)
        .then(response => {
            if (response) {
                fetch('http://localhost:3000/submissions', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        id: this.state.user.id
                    })
                })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, {submissions: count}))
                    })
            }
            this.displayFaceBox(this.calculateFaceLocation(response))
        })
            .catch(err => console.log(err));
	}

    onRouteChange = (route) => {
        if(route === 'signout') {
            this.setState({isSignedIn: false});
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({ route: route });
    }

    render() {
        const { isSignedIn, route, box, imageUrl } = this.state;
	  	return (
		<div className="App">
			<Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange } />
            <ParticlesBackground />
            { route === 'home'
                ? <div>
                    <Logo />
        			<Rank
                        name={this.state.user.name}
                        submissions={this.state.user.submissions}
                     />
        			<ImageLinkForm
        				onInputChange={this.onInputChange}
        				onImageSubmit={this.onImageSubmit}
        			/>
                    <FaceRecognition
                        box={box}
                        imageUrl={imageUrl}
                     />
                </div>
                : (
                    route === 'signin'
                    ? <Signin
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                     />
                    : <Register
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                     />
                )
            }
		</div>
		);
	}
}

export default App;
