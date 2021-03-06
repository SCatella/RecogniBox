import React from 'react';


class Form extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            user: {
                id: '',
                name: '',
                email: '',
                submissions: 0,
                joined: ''
            }
        }
    }


    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onRegisterSubmit = () => {
        const { name, email, password } = this.state;;
        if (name && email && password) {
            fetch(this.props.server + 'register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(user => {
                if (this.props.route === 'register') {
                    if (user.id) {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    }
                }
            })
        }
    }

    onSignInSubmit = () => {
        const { email, password } = this.state;
        if (email && password) {
            fetch(this.props.server + 'signin', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
        }
    }


    render() {
        const { onRouteChange } = this.props;
        if (this.props.route === 'register') {
            return (
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label
                                        className="db fw6 lh-copy f6"
                                        htmlFor="name">Name</label>
                                    <input
                                        onChange={this.onNameChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="text"
                                        name="name"
                                        id="name"
                                    />
                                </div>
                                <div className="mt3">
                                    <label
                                        className="db fw6 lh-copy f6"
                                        htmlFor="email-address">Email</label>
                                    <input
                                        onChange={this.onEmailChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                    />
                                </div>
                                <div className="mv3">
                                    <label
                                        className="db fw6 lh-copy f6"
                                        htmlFor="password">Password</label>
                                    <input
                                        onChange={this.onPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        name="password"
                                        id="password"
                                    />
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onRegisterSubmit}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Register"
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <p
                                    onClick={() => onRouteChange('signin')}
                                    className="f6 link dim black db pointer">Sign In</p>
                            </div>
                        </div>
                    </main>
                </article>
            );
        } else if (this.props.route === 'signin'){
            return (
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label
                                        className="db fw6 lh-copy f6"
                                        htmlFor="email-address">Email</label>
                                    <input
                                        onChange={this.onEmailChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                    />
                                </div>
                                <div className="mv3">
                                    <label
                                        className="db fw6 lh-copy f6"
                                        htmlFor="password">Password</label>
                                    <input
                                        onChange={this.onPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        name="password"
                                        id="password"/>
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSignInSubmit}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in"
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <p
                                    onClick={() => onRouteChange('register')}
                                    className="f6 link dim black db pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            );
        }
    }
}

export default Form;
