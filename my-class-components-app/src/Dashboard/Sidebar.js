import React, { Component } from 'react';
import './Sidebar.css'; // Sidebar styling
import { FaTachometerAlt, FaBook, FaRegFileAlt, FaBell, FaCog, FaDatabase } from 'react-icons/fa';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-content">
          <ul>
            <li onClick={() => this.props.onMenuClick('recentCirculation')}><FaTachometerAlt /> Dashboard</li> {/* Dashboard menu */}
            <li onClick={() => this.props.onMenuClick('totalBooks')}><FaBook /> Library</li> {/* Library menu */}
            <li><FaRegFileAlt /> Book Request</li>
            <li><FaBell /> Notifications</li>
            <li><FaCog /> Settings</li>
            <li><FaDatabase /> Database Backup</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
