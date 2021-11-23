import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Form from './components/Form/Form.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground.js';
import './App.css';


const initialState = {
    input: '',
    imageUrl: '',
    box: [],
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

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
            imageUrl: '',
            box: [],
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
        const clarifaiArray = data.outputs[0].data.regions.map(modelData => modelData.region_info.bounding_box);
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        const boxArray = clarifaiArray.map(modelData => {
            return {
                topRow: modelData.top_row * height,
                rightCol: width - (modelData.right_col * width),
                bottomRow: height - (modelData.bottom_row * height),
                leftCol: modelData.left_col * width
            }
        });
        return boxArray;
    }

    displayFaceBox = (box) => {
        this.setState({ box })
    }

    onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onImageSubmit = () => {
		this.setState({imageUrl: this.state.input});
        fetch(this.server + 'submissionsurl', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response) {
                fetch(this.server + 'submissions', {
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
            this.displayFaceBox(this.calculateFaceLocation(response));
        })
            .catch(err => console.log(err));
	}

	loadUser = (data) => {
        this.setState({ user: {
            id: data.id,
            name: data.name,
            email: data.email,
            submissions: data.submissions,
            joined: data.joined
        } })
    }

    onRouteChange = (route) => {
        if(route === 'signin') {
            this.setState(initialState);
        } else if (route === 'home') {
            this.setState({isSignedIn: true});
        }
        this.setState({ route: route });
    }

    server = 'https://recognibox-api.herokuapp.com/';


    render() {
        const { isSignedIn, route, box, imageUrl } = this.state;
	  	return (
		<div className="App">
            <Logo />
			<Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange } />
            <ParticlesBackground />
            { route === 'home'
                ? <div>
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
                    <Form
                        route={route}
                        loadUser={this.loadUser}
                        onRouteChange={this.onRouteChange}
                        initialState={this.initialState}
                        server={this.server}
                     />
                )
            }
		</div>
		);
	}
}

export default App;
