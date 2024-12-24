// src/DashboardHeader/DashboardHeader.js
import React, { Component } from 'react';
import './DashboardHeader.css'; 
import { FaUserCircle } from 'react-icons/fa'; // Admin icon from react-icons
import { IoIosArrowDown } from 'react-icons/io'; // Dropdown arrow icon

class DashboardHeader extends Component {
  state = {
    isDropdownOpen: false, // To track the dropdown state
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  handleLogout = () => {
    // You can handle logout logic here, e.g., clearing session data or redirecting to login
    alert('Logging out...');
    window.location.href = '/login'; // Redirect to login page
  };

  render() {
    const { isDropdownOpen } = this.state;

    return (
      <header className="dashboard-header">
        <div className="welcome-container">
          <FaUserCircle size={40} />
          <p className="welcome-message">Hi, Admin</p>
          <div className="dropdown-container">
            <button className="dropdown-btn" onClick={this.toggleDropdown}>
              <IoIosArrowDown size={20} />
            </button>
            <div
              className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
            >
              <button className="dropdown-item" onClick={this.handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default DashboardHeader;
