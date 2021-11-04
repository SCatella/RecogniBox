import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import Rank from './components/Rank/Rank.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import './App.css';

class App extends Component {
    	render() {
	  	return (
			<div className="App">
				<Navigation />
				<Logo />
        <Rank />
				<ImageLinkForm />
				<FaceRecognition />
			</div>
  		);
	}
}

export default App;
