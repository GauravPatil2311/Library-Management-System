import React, { Component } from 'react';
import './Table.css';
import axios from 'axios';
import IssueForm from './IssueForm';
import ReturnForm from './ReturnForm';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      circulations: [],
      showModal: false,
      showReturnModal: false,
    };
  }

  componentDidMount() {
    this.fetchCirculations();
  }

  fetchCirculations = () => {
    axios.get('http://localhost:3000/circulations')
      .then((response) => {
        const formattedCirculations = response.data.map((circulation) => ({
          ...circulation,
          'Issue Date': this.formatDate(circulation['Issue Date']),
          'Return Date': this.formatDate(circulation['Return Date']),
        }));
        this.setState({ circulations: formattedCirculations });
      })
      .catch((error) => {
        console.error('Error fetching circulations:', error);
      });
  };

  formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-CA'); // Format as 'YYYY-MM-DD'
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleShowReturnModal = () => {
    this.setState({ showReturnModal: true });
  };

  handleCloseReturnModal = () => {
    this.setState({ showReturnModal: false });
  };

  handleAddCirculation = (newCirculation) => {
    axios.post('http://localhost:3000/circulations', newCirculation)
      .then(() => {
        this.fetchCirculations();
        this.handleCloseModal();
      })
      .catch((error) => {
        console.error('Error issuing book:', error);
      });
  };

  handleReturnBook = (updatedCirculations) => {
    axios.put('http://localhost:3000/circulations/return', updatedCirculations)
      .then(() => {
        this.fetchCirculations();
        this.handleCloseReturnModal();
      })
      .catch((error) => {
        console.error('Error returning book:', error);
      });
  };

  render() {
    const { searchQuery, circulations, showModal, showReturnModal } = this.state;

    const filteredCirculations = circulations.filter((row) =>
      Object.values(row).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return (
      <div className="table-container">
        <div className="table-header">
          <h2>Recent Circulations</h2>
          <div className="table-controls">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={this.handleSearch}
              className="search-box"
            />
            <button className="add-issue-button" onClick={this.handleShowModal}>
              + Add Issue
            </button>
            <button className="return-book-button" onClick={this.handleShowReturnModal}>
              Return Book
            </button>
          </div>
        </div>
        <table className="circulation-table">
          <thead>
            <tr>
              <th>Member ID</th>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCirculations.map((row, index) => (
              <tr key={index}>
                <td>{row['Member ID']}</td>
                <td>{row['Book ID']}</td>
                <td>{row['Book Name']}</td>
                <td>{row['Author']}</td>
                <td>{row['Issue Date']}</td>
                <td>{row['Return Date']}</td>
                <td>{row['Status']}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <IssueForm
            onClose={this.handleCloseModal}
            onAddCirculation={this.handleAddCirculation}
          />
        )}
        {showReturnModal && (
          <ReturnForm
            circulations={circulations}
            onReturn={this.handleReturnBook}
            onClose={this.handleCloseReturnModal}
          />
        )}
      </div>
    );
  }
}

export default Table;
