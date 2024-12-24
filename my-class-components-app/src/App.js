import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  handleLoginSuccess = () => {
    this.setState({ isAuthenticated: true });
  };

  handleLogout = () => {
    this.setState({ isAuthenticated: false });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <div className="App">
        {isAuthenticated ? (
          <Dashboard onLogout={this.handleLogout} />
        ) : (
          <Login onLoginSuccess={this.handleLoginSuccess} />
        )}
      </div>
    );
  }
}

export default App;
