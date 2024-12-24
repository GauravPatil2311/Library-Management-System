import React, { Component } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import Cards from './Cards';
import './Dashboard.css';
import Table from './Table';
import TotalBooks from './TotalBooks';

class Dashboard extends Component {
  state = {
    currentView: 'recentCirculation', // Default to 'recentCirculation'
  };

  // Handle clicking on Sidebar menu items
  handleMenuClick = (view) => {
    this.setState({ currentView: view });
  };

  render() {
    const { currentView } = this.state;
    const { onLogout } = this.props;

    return (
      <div className="dashboard">
        <DashboardHeader onLogout={onLogout} />
        <div className="dashboard-body">
          <Sidebar onMenuClick={this.handleMenuClick} /> {/* Pass onMenuClick to Sidebar */}
          <div className="main-content">
            {/* Only show Cards if currentView is 'recentCirculation' */}
            {currentView === 'recentCirculation' && <Cards />}
            {currentView === 'totalBooks' && <TotalBooks />}
            {currentView === 'recentCirculation' && <Table />}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
