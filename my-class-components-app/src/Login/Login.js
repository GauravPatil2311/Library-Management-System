import React, { Component } from 'react';
import './Login.css';
import loginBackground from '../Images/login_background.jpg';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { onLoginSuccess } = this.props;

    if (username.trim() === 'admin' && password === 'admin@123') {
      this.setState({ errorMessage: '' });
      onLoginSuccess(); // Notify App component
    } else {
      this.setState({ errorMessage: 'Invalid username or password!' });
    }
  };

  render() {
    const { username, password, errorMessage } = this.state;

    return (
      <div
        className="login-container"
        style={{
          backgroundImage: `url(${loginBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="login-box">
          <h2 className="login-title">Library Admin Login</h2>
          <form onSubmit={this.handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.handleInputChange}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
